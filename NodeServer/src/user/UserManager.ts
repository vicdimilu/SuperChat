import SocketIO = require('socket.io');
import { UserModel } from '../database/models/ChatServerModel';
import { Room } from '../room/RoomStruct';
import { SQLServer } from '../server/SQLServer';
import { RoomPacketResponse, UserAction, UserLogin, UserPacketLoginResponse, UserSocketData } from './UserPacket.struct';

export class UserManager {
    private app: SocketIO.Server;

    constructor(app: SocketIO.Server){
        this.app = app;
    }

    setUserDataToSocketData(socket: SocketIO.Socket, userSocketData: UserSocketData):UserSocketData{
        Object.entries(userSocketData).forEach(
            ([key,value]) => {
            socket.data[key] = value;
        })
        console.log("UserManager.ts     > setUserDataToSocketData(): ","Socket.data = ",socket.data);
        return socket.data as UserSocketData;
    }

    findUserById(socket_id:string):SocketIO.Socket{
        try {
            this.app.sockets.sockets.forEach(socket => {
                if (socket.id == socket_id){
                    return socket;
                }
            });
            return null;
        } catch (error) {
            return null;
        } 
    }

    userEmitMsgToAll(emitUserSocket: SocketIO.Socket, response:any){//testear
        this.app.emit(this.getUserSocketData(emitUserSocket).chat_id, response);
    }

    userEmitMsgToAnotherUser(emitUserSocket:SocketIO.Socket, anotherUserSocket:SocketIO.Socket, response:any){//Testear
        const chatId:string = this.getUserSocketData(emitUserSocket).chat_id;
        emitUserSocket.emit(chatId, response);
        anotherUserSocket.emit(chatId, response);
    }

    userEmitMsgToRoom(emitUserSocket: SocketIO.Socket, roomId: number, response:any){//testear
        this.app.in(""+roomId).emit(this.getUserSocketData(emitUserSocket).chat_id, response)
    }

    userDisconnect(userSocket: SocketIO.Socket){//pendiente
        //Forzar la desconexion del usuario
        userSocket.disconnect(true);
    }

    serverLoginUserResponse(userSocket: SocketIO.Socket, room: Room){
        const chatId:string = this.getUserSocketData(userSocket).chat_id;
        const response = {
            user_action: UserAction.USER_ANONYMOUS, 
            username: this.getUserSocketData(userSocket).username,
            room: {roomId: room.rId, roomChat: room.rChat, roomName: room.rName} as RoomPacketResponse
        } as UserPacketLoginResponse;
        console.log("UserManager.ts     > serverLoginUserResponse(): ","response = ",response);
        userSocket.emit(chatId, response);
    }

    getUserSocketData(userSocket: SocketIO.Socket): UserSocketData{
        return userSocket.data as UserSocketData;
    }

    getArrayUserToModel(gSQLServer: SQLServer): Array<UserModel>{
        //fetch app.sockets
        let arrayUserModel: Array<UserModel> = [];
        this.app.sockets.sockets.forEach(socket => {
            let userSocketData = socket.data as UserSocketData;
            arrayUserModel.push(gSQLServer._GetUserData(userSocketData.chat_id, userSocketData.userId));
        });
        return arrayUserModel;
    }
}
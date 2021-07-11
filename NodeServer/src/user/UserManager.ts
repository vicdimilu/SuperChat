import SocketIO = require('socket.io');
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

    serverLoginUserResponse(userSocket: SocketIO.Socket){
        const chatId:string = this.getUserSocketData(userSocket).chat_id;
        const response = {
            user_action: UserAction.USER_ANONYMOUS, 
            username: this.getUserSocketData(userSocket).username,
            rooms: [{roomId: "0", roomName: "General"}]
        } as UserPacketLoginResponse;
        console.log("UserManager.ts     > serverLoginUserResponse(): ","response = ",response);
        userSocket.emit(chatId, response);
    }

    getUserSocketData(userSocket: SocketIO.Socket): UserSocketData{
        return userSocket.data as UserSocketData;
    }
}
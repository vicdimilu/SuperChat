import SocketIO = require('socket.io');
import { UserAction, UserLogin, UserPacketLoginResponse, UserSocketData } from './UserPacket.struct';

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
        console.log("UserManager.ts    > setUserDataToSocketData(): ","Socket.data = ",socket.data);
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
        this.app.emit(this.getUserChatIdToString(emitUserSocket), response);
    }

    userEmitMsgToAnotherUser(emitUserSocket:SocketIO.Socket, anotherUserSocket:SocketIO.Socket, response:any){//Testear
        const chatId:string = this.getUserChatIdToString(emitUserSocket);
        emitUserSocket.emit(chatId, response);
        anotherUserSocket.emit(chatId, response);
    }

    userEmitMsgToRoom(emitUserSocket: SocketIO.Socket, roomId: number, response:any){//testear
        this.app.in(""+roomId).emit(this.getUserChatIdToString(emitUserSocket), response)
    }

    userDisconnect(userSocket: SocketIO.Socket){//pendiente
        //Forzar la desconexion del usuario
        userSocket.disconnect(true);
    }

    serverLoginUserResponse(userSocket: SocketIO.Socket){
        const chatId:string = this.getUserChatIdToString(userSocket);
        const userSocketData = userSocket.data as UserSocketData;
        const response = {user_action: UserAction.USER_ANONYMOUS, username: userSocketData.username} as UserPacketLoginResponse;
        console.log("UserManager.ts    > serverLoginUserResponse(): ","response = ",response);
        userSocket.emit(chatId, response);
    }

    getUserChatIdToString(userSocket: SocketIO.Socket): string{
        return (userSocket.data as UserSocketData).chat_id;
    }
}
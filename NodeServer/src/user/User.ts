import SocketIO = require('socket.io');
import { UserPacketBase, UserSendMessagePacket, UserCreateRoomPacket, UserAddOtherUserToRoom, UserPacket } from './UserPacket.struct';

export class User {
    username: string;
    private socket: any;
    private app: SocketIO.Server;

    constructor(socket:any, app: SocketIO.Server){
        this.username = "";
        this.socket = socket;
        this.app = app;
        this.init();
    }

    init(){

        //Join to server how anonymous
        this.socket.on(UserPacket.Anonymous,(msg: string) => {
            let recv_message:UserPacketBase = JSON.parse(msg);
            this.username = "Anonymous#";
            this.socket.emit(UserPacket.Anonymous, true);
        });

        //Recibe peticion SuperChat
        this.socket.on(UserPacket.SuperChat,(msg: string) => {
            this.app.emit(UserPacket.SuperChat, msg)
        });

        //Recibe mensaje privado
        /*this.socket.on(UserPacket.PrivateChatMessage, (anotherSocketId: any, msg: string) => {
            this.socket.to(anotherSocketId).emit(UserPacket.PrivateChatMessage, this.socket.id, this.username+": "+msg);
            this.socket.emit(UserPacket.PrivateChatMessage, this.username+": "+msg);
        });*/
    }
}
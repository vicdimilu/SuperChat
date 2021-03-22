import SocketIO = require('socket.io');
import { UserPacket } from './UserPacket.struct';

export class User {
    nick: string;
    private socket: any;
    private app: SocketIO.Server;

    constructor(socket:any, app: SocketIO.Server){
        this.nick = "";
        this.socket = socket;
        this.app = app;
        this.init();
    }

    init(){

        //Join to server how anonymous
        this.socket.on(UserPacket.Anonymous,(msg: string) => {
            this.nick = msg;
            this.socket.emit(UserPacket.Anonymous, true);
        });

        //Recibe mensaje chat general
        this.socket.on(UserPacket.GeneralChatMessage,(msg: string) => {
            this.app.emit(UserPacket.GeneralChatMessage, this.nick+": "+msg)
        });

        //Recibe mensaje privado
        this.socket.on(UserPacket.PrivateChatMessage, (anotherSocketId: any, msg: string) => {
            this.socket.to(anotherSocketId).emit(UserPacket.PrivateChatMessage, this.socket.id, this.nick+": "+msg);
            this.socket.emit(UserPacket.PrivateChatMessage, this.nick+": "+msg);
        });
    }
}
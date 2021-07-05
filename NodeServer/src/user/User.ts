import SocketIO = require('socket.io');
import { UserPacketBase, UserSocketData } from './UserPacket.struct';


export class User {
    private socket: SocketIO.Socket;

    constructor(socket:SocketIO.Socket){
        this.socket = socket
        this.socket.data = {} as UserSocketData;
        this.init();
    }

    getSocketId():string{
        return this.socket.id;
    }

    getUsername():string{
        return this.socket.data;
    }

    setUsername(username:string){
        this.socket.data.username = username;
    }

    registerUserDB(){
        //pendiente de registrar en sqlite
    }

    loginUserDB(){
        //pendiente loguear en 
    }

    init(){

        //Init Login Events
        this.loginEvent();

        //User Request SuperChat Message
        this.socket.on(UserPacket.SuperChat,(msg: string) => {
            this.app.emit(UserPacket.SuperChat, msg)
        });

        //Recibe mensaje privado
        /*this.socket.on(UserPacket.PrivateChatMessage, (anotherSocketId: any, msg: string) => {
            this.socket.to(anotherSocketId).emit(UserPacket.PrivateChatMessage, this.socket.id, this.username+": "+msg);
            this.socket.emit(UserPacket.PrivateChatMessage, this.username+": "+msg);
        });*/
    }

    loginEvent(){
        //Anonimo
        this.socket.on(UserPacket.Anonymous,(msg: UserLogin) => {
            this.setUsername("Anonymous#"+this.getSocketId());
            console.log("Nuevo Usuario Logueado: "+this.getUsername());
            let response: UserPacketBase = {
                user_action : 0,
                user_id: this.socket.id
            }
            this.socket.emit(UserPacket.Anonymous, true);
        });

        //Login User //PENDIENTE
        this.socket.on(UserPacket.Login,(msg: UserLogin) => {
            let recv_message:UserLogin = msg;
            this.setUsername("Anonymous#"+this.getSocketId());
            console.log("Nuevo Usuario Logueado: "+this.getUsername());
            let response: UserPacketBase = {
                user_action : 0,
                user_id: this.socket.id
            }
            this.socket.emit(UserPacket.Anonymous, true);
        });

    }

    registerEvent(){
        //Register User
        this.socket.on(UserPacket.Register,(msg: any) => {
            //pendiente
        });

    }

    ChatEvents(){
        //User Request SuperChat Message
        this.socket.on(UserPacket.SuperChat,(request: UserPacketBase) => {
            //llamar protocolo para ejecutar acción
            let response = this.SuperChatProtocol.getServerResponse(request);
            this.app.emit(UserPacket.SuperChat, response);
        });

        //Recibe mensaje privado
        /*this.socket.on(UserPacket.PrivateChatMessage, (anotherSocketId: any, msg: string) => {
            this.socket.to(anotherSocketId).emit(UserPacket.PrivateChatMessage, this.socket.id, this.username+": "+msg);
            this.socket.emit(UserPacket.PrivateChatMessage, this.username+": "+msg);
        });*/
    }
}
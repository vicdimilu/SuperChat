import { ChatProtocol } from "../protocol/ChatProtocol";
import { UserManager } from "../user/UserManager";
import SocketIO = require('socket.io');
import { SQLServer } from "./SQLServer";
import { UserPacketBase } from "../user/UserPacket.struct";
import { RoomManager } from "../room/RoomManager";

export class ChatServer{
    private chatID: string;
    private gChatProtocol: ChatProtocol;
    private app: SocketIO.Server;

    constructor(app: SocketIO.Server, chatID:number){
        this.chatID = "0x"+chatID;
        console.log("ChatServer.ts      > constructor(): Servidor de Chat ID: "+this.chatID);
        this.app = app;
        this.gChatProtocol = new ChatProtocol(new SQLServer(chatID), new UserManager(app), new RoomManager());
    }

    getId():number{
        return +this.chatID.split("x")[1];
    }

    connect(socket: SocketIO.Socket){
        socket.on(this.chatID,(request: UserPacketBase) => {
            //llamar protocolo para ejecutar acción
            console.log("ChatServer.ts      > connect(): RECV_REQUEST: ",request);
            this.gChatProtocol.execActionRequest(this.chatID, socket, request);
        });
    }

    disconnect(socket: SocketIO.Socket, reason:any){//PENDIENTE (buscar tipo de la variable reason)
        //hacer algo con la desconección
    }
}
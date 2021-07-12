import { ChatProtocol } from "../protocol/ChatProtocol";
import { UserManager } from "../user/UserManager";
import SocketIO = require('socket.io');
import { SQLServer } from "./SQLServer";
import { UserPacketBase } from "../user/UserPacket.struct";
import { RoomManager } from "../room/RoomManager";

export class ChatServer{
    private chatID: string;
    private gChatProtocol: ChatProtocol;

    constructor(app: SocketIO.Server, gSQLServer: SQLServer, chatID:number){
        this.chatID = "0x"+chatID;
        console.log("ChatServer.ts      > constructor(): Servidor levantado con Chat ID: "+this.chatID);
        this.gChatProtocol = new ChatProtocol(gSQLServer, new UserManager(app), new RoomManager(gSQLServer._GetRooms(""+this.getId())));
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

    saveChatServer(){//pendiente
        this.gChatProtocol._SaveServer(this.chatID.split("x")[1]);
    }
}
import { RoomManager } from "../room/RoomManager";
import { SQLServer } from "../server/SQLServer";
import { UserManager } from "../user/UserManager";
import { UserAction, UserLogin, UserPacketBase, UserSendMessagePacket, UserSocketData } from "../user/UserPacket.struct";
import SocketIO = require('socket.io');

export class ChatProtocol {
    private gSQLServer: SQLServer;
    private gUserManager: UserManager;
    private gRoomManager: RoomManager;

    constructor(sQLServer:SQLServer, userManager: UserManager, roomManager: RoomManager) {
        this.gSQLServer = sQLServer;
        this.gUserManager = userManager;
        this.gRoomManager = roomManager;
    }

    getServerResponse(chatId: string, userSocket: SocketIO.Socket, request: UserPacketBase){
        let userSocketData: UserSocketData = userSocket.data as UserSocketData;
        switch (request.user_action) {
            case UserAction.USER_ANONYMOUS:
                console.log("ChatProtocol.ts    > getServerResponse(): ","UserAction.USER_ANONYMOUS");
                userSocketData = {
                    chat_id: chatId,
                    username: "anonymous#"+userSocket.id.slice(0,4)
                }
                this.gUserManager.setUserDataToSocketData(userSocket, userSocketData);
                this.gUserManager.serverLoginUserResponse(userSocket);
                break;

            case UserAction.USER_LOGIN:
                console.log("ChatProtocol.ts    > getServerResponse(): ","UserAction.USER_LOGIN");
                break;

            case UserAction.USER_REGISTER:
                console.log("ChatProtocol.ts    > getServerResponse(): ","UserAction.USER_REGISTER");
                break;

            case UserAction.USER_ACTIVATE_ACCOUNT:
                console.log("ChatProtocol.ts    > getServerResponse(): ","UserAction.USER_ACTIVATE_ACCOUNT");
                break;

            case UserAction.USER_RECOVERY_PASS:
                console.log("ChatProtocol.ts    > getServerResponse(): ","UserAction.USER_RECOVERY_PASS");
                break;

            case UserAction.USER_SEND_MSG_TO_ROOM:
                console.log("ChatProtocol.ts    > getServerResponse(): ","UserAction.USER_SEND_MSG_TO_ROOM");
                console.log("ChatProtocol.ts    > getServerResponse(): ","request recibido ", request)
                let request_aux = request as UserSendMessagePacket;
                request_aux.user_name = userSocketData.username;
                this.gUserManager.userEmitMsgToAll(userSocket, request_aux)
                break;

            case UserAction.USER_CREATE_ROOM:
                console.log("ChatProtocol.ts    > getServerResponse(): ","UserAction.USER_CREATE_ROOM");
                break;

            case UserAction.USER_ADD_TO_ROOM:
                console.log("ChatProtocol.ts    > getServerResponse(): ","UserAction.USER_ADD_TO_ROOM");
                break;

            case UserAction.USER_ADD_ADMIN_TO_ROOM:
                console.log("ChatProtocol.ts    > getServerResponse(): ","UserAction.USER_ADD_ADMIN_TO_ROOM");
                break;

            default:
                return false;
        }
    }
}
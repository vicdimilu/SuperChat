//import { ChatAPI, ChatLibrary, UserPacketBase, UserPacketLoginResponse, UserPacketResponse, UserPacketSendMsgResponse, UserProfile, UserSendMessagePacket } from "./State.Interface";
import { _ConsoleLog } from "./DevConsoleController";
import { ChatLibrary, UserPacketLoginResponse, UserPacketResponse, UserPacketSendMsgResponse, UserProfile } from "./State.Interface";
import { _UserSetRoom } from "./UserController";

//Revisar si colocarlo en un archivo distinto, ingresando la variable response
export const _Protocol = (user: UserProfile, packetRECV: UserPacketResponse, _ArrayFunctionPacketRecv:Array<any>) => {
    switch (packetRECV.user_action) {
        case ChatLibrary.USER_ANONYMOUS:
            const response = packetRECV as UserPacketLoginResponse;
            user.username = response.username;
            user.isAuthenticated = true;
            _UserSetRoom(response.room);
            _ConsoleLog("UserProtocolController.ts > _Protocol(): USER_ANONYMOUS", user.username);
            if(_ArrayFunctionPacketRecv[ChatLibrary.USER_ANONYMOUS])
                _ArrayFunctionPacketRecv[ChatLibrary.USER_ANONYMOUS](null, user);
        break;
        case ChatLibrary.USER_SEND_MSG_TO_ROOM:
            let res = packetRECV as UserPacketSendMsgResponse;
            _ConsoleLog("UserProtocolController.ts > _Protocol(): USER_SEND_MSG_TO_ROOM > ",res.user_name+ ": "+res.user_message);
            user.rooms[res.message_room_id].addMsg(res.user_name, res.user_message);
            if(_ArrayFunctionPacketRecv[ChatLibrary.USER_SEND_MSG_TO_ROOM])
                _ArrayFunctionPacketRecv[ChatLibrary.USER_SEND_MSG_TO_ROOM](null, user);
        break;
    
        default:
        break;
    }
}
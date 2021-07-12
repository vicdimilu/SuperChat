//import { ChatAPI, ChatLibrary, UserPacketBase, UserPacketLoginResponse, UserPacketResponse, UserPacketSendMsgResponse, UserProfile, UserSendMessagePacket } from "./State.Interface";
import { _ConsoleLog } from "./DevConsoleController";
import { ChatLibrary, UserPacketLoginResponse, UserPacketResponse, UserPacketSendMsgResponse } from "./State.Interface";
import { _UserGetProfile, _UserSetRoom } from "./UserController";

//Revisar si colocarlo en un archivo distinto, ingresando la variable response
export const _Protocol = (packetRECV: UserPacketResponse, _ArrayFunctionPacketRecv:Array<any>) => {
    switch (packetRECV.user_action) {
        case ChatLibrary.USER_ANONYMOUS:
            const response = packetRECV as UserPacketLoginResponse;
            _UserGetProfile().username = response.username;
            _UserGetProfile().isAuthenticated = true;
            _UserSetRoom(response.room.roomId,response.room.roomName,response.room.roomChat);
            _ConsoleLog("UserProtocolController.ts > _Protocol(): USER_ANONYMOUS", _UserGetProfile());
            if(_ArrayFunctionPacketRecv[ChatLibrary.USER_ANONYMOUS])
                _ArrayFunctionPacketRecv[ChatLibrary.USER_ANONYMOUS](null, _UserGetProfile());
        break;
        case ChatLibrary.USER_SEND_MSG_TO_ROOM:
            let res = packetRECV as UserPacketSendMsgResponse;
            _ConsoleLog("UserProtocolController.ts > _Protocol(): USER_SEND_MSG_TO_ROOM > ",res.user_name+ ": "+res.user_message);
            _UserGetProfile().rooms[res.message_room_id].addMsg(res.user_name, res.user_message);
            if(_ArrayFunctionPacketRecv[ChatLibrary.USER_SEND_MSG_TO_ROOM])
                _ArrayFunctionPacketRecv[ChatLibrary.USER_SEND_MSG_TO_ROOM](null, _UserGetProfile());
        break;
    
        default:
        break;
    }
}
import { Room } from "./Room";

export interface ChatState {
    value: string,
    msgCount: number,
    nick: string,
    message: string
}

export enum ChatLibrary { //actions
    USER_ANONYMOUS = 0,
    USER_LOGIN = 1,
    USER_REGISTER = 2,
    USER_RECOVERY_PASS = 3,
    USER_ACTIVATE_ACCOUNT = 4,
    USER_SEND_MSG_TO_ROOM = 5,//1 = send message to room id, 
    USER_CREATE_ROOM = 6,//2 = create room (must have user id array),
    USER_ADD_TO_ROOM = 7,//3 = add user to room
    USER_ADD_ADMIN_TO_ROOM = 8//4 = add admin user
}

export enum ChatAPI{
    API_CODE = "0x0"
}

export interface UserLogin {
    user_name: string
}

export interface UserPacketBase {
    //0 = server response
    user_action: number,
    user_id: string,
}

export interface UserSendMessagePacket extends UserPacketBase {
    user_name: string,
    user_message: string,
    message_room_id: number
}


//USER RESPONSES
export interface UserPacketResponse{
    user_action: number
}

export interface UserPacketLoginResponse extends UserPacketResponse{
    username: string,
    room:RoomPacketResponse
}

export interface RoomPacketResponse {
    roomId: string,
    roomName: string,
    roomChat: Array<string>
}

export interface UserPacketSendMsgResponse extends UserPacketResponse{
    user_name: string,
    user_message: string,
    message_room_id: number
}

export interface UserProfile {
    username: string,
    rooms: Array<Room>,
    selectedRoomId: string,
    friends: Array<string>,
    isAuthenticated: boolean
}
export enum UserPacket {
    Anonymous = "0x00",
    Register = "0x01",
    Login = "0x02",
    RecoveryPass = "0x03",
    ActivateAccount = "0x04",
    SuperChat = "0x05"
}

export interface UserLogin {
    user_name: string
}

export interface UserPacketBase {
    //0 = send message to room id, 
    //1 = create room (must have user id array), 
    //2 = add user to room
    //3 = add admin user
    user_action: number,
    user_id: number,
}
export interface UserSendMessagePacket extends UserPacketBase {
    user_name: string,
    user_message: string,
    message_room_id: number
}

export interface UserCreateRoomPacket extends UserPacketBase {
    other_users_id: Array<number>
}

export interface UserAddOtherUserToRoom extends UserPacketBase {
    other_users_id: Array<number>,
    message_room_id:number
}
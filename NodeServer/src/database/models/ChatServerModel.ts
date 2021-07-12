export interface ChatServerModel{
    sChatId: string,
    sChatUsers: Array<UserModel>,
    sChatRooms: Array<RoomModel>
}

export interface UserModel{
    uId: string,
    uNick: string,
    uEmail: string,
    uPassword: string,
    uRoomsOwnerId: Array<string>,
    uRoomsAdminId: Array<string>,
    uRoomsMemberId: Array<string>
}

export interface RoomModel{
    rId: string,
    rName: string,
    rChat: Array<string>,
    rOwnerId: string,
    rAdminsId: Array<string>,
    rMembers: Array<string>
}
import { _ConsoleLog } from "./DevConsoleController";
import { Room } from "./Room";
import { UserProfile } from "./State.Interface";

let user: UserProfile;

export const _InitUserController = () => {
    let aux_rooms: Array<Room> = [];
    aux_rooms[0] = new Room("0", "General");
    user = {
        username: "",
        rooms: aux_rooms,
        selectedRoomId: "0",
        friends: [],
        isAuthenticated: false
    } as UserProfile;
    _ConsoleLog("UserController.ts > _InitUserController(): Controlador cargado correctamente -> ", user);
}

export const _UserGetProfile = (): UserProfile => {
    return user;
}

export const _UserGetUsername = (): string => {
    return user.username
}

export const _UserGetSelectedIdRoom = (): string => {
    return user.selectedRoomId;
}

export const _UserCurrentRoomName = () => {
    return user.rooms[+user.selectedRoomId].name;
}

export const _UserIsAuthenticated = () => {
    return user.isAuthenticated;
}

export const _UserGetRoom = (roomId: string) : Room => {
    return user.rooms[+roomId];
}

export const _UserSetRoom = (roomId: string, roomName: string) => {
    user.rooms[+roomId] = new Room(roomId, roomName);
}

export const _UserChangeRoom = (roomId: string) => {
    user.selectedRoomId = roomId;
}

export const _UserLeaveRoom = (roomId: string) => {

}


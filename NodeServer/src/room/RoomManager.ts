import { Room } from "./RoomStruct";
import SocketIO = require('socket.io');
import { RoomModel } from "../database/models/ChatServerModel";

export class RoomManager {
    private rooms: Array<Room>;
    constructor(rooms: Array<Room>) {
        this.rooms = rooms;
    }

    userCreateRoom(ownerSocket:SocketIO.Socket, roomName: string){
        //owner of the room must to be the user that create this.

    }

    userOwnerDeleteRoom(ownerSocket: SocketIO.Socket, roomId:number){
        //user have to be owner of the room

    }

    userLeaveOfRoom(socket: SocketIO.Socket, roomId:number){
        //user have to be on the room

    }

    userAdminAddOtherUsersToRoom(adminSocket: SocketIO.Socket, users: Array<SocketIO.Socket>, roomId:number){
        //user have to be owner or admin of the room
    }

    userAdminDelOtherUsersToRoom(adminSocket: SocketIO.Socket, users: Array<SocketIO.Socket>, roomId: number){
        //user have to be owner or admin of the room
    }

    userOwnerAddAdminsToRoom(ownerSocket: SocketIO.Socket, adminSockets: Array<SocketIO.Socket>, roomId:number){
        //user have to be owner of the room
    }

    userOwnerDelAdminsToRoom(ownerSocket: SocketIO.Socket, adminSockets: Array<SocketIO.Socket>, roomId:number){
        //user have to be owner of the room

    }

    getArrayRoomToModel(): Array<RoomModel>{
        return this.rooms as Array<RoomModel>;
    }

    userSendMessageToRoom(roomId: number, msg: string){
        this.rooms[roomId].rChat.push(msg);
    }

    userFindRoomById(roomId: number): Room{
        return this.rooms[roomId];
    }
}
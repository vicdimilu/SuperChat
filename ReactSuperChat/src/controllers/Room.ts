export class Room {
    private roomId: string;
    private roomName: string;
    private messages: Array<string>;

    constructor(roomId: string, roomName: string){
        this.roomId = roomId;
        this.roomName = roomName;
        this.messages = [];
    }

    
    public get id() : string {
        return this.roomId;
    }

    
    public get msgs() : Array<string> {
        return this.messages;
    }

    
    public get name() : string {
        return this.roomName;
    }
    
    
    
    addMsg(username: string, msg: string){
        this.messages = this.messages.concat(username + ": " + msg);
    }
}
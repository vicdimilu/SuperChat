export class Room {
    private roomName: string;
    constructor(name: string) {
        this.roomName = name;
    }
    
    public get name() : string {
        return this.roomName;
    }
    
}
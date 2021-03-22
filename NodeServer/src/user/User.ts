import SocketIO = require('socket.io');

export class User {
    nick: string;
    private socket: any;
    private app: SocketIO.Server;

    constructor(socket:any, app: SocketIO.Server){
        this.nick = "";
        this.socket = socket;
        this.app = app;
        this.init();
    }

    init(){

        //Join to server
        this.socket.on("0x00",(msg: string) => {
            this.nick = msg;
        });

        //Recibe mensaje chat general
        this.socket.on("1x00",(msg: string) => {
            this.app.emit("1x00", this.nick+": "+msg)
        });

        //Recibe mensaje privado
        this.socket.on("1x01", (anotherSocketId: any, msg: string) => {
            this.socket.to(anotherSocketId).emit("1x01", this.socket.id, this.nick+": "+msg);
            this.socket.emit("1x01", this.nick+": "+msg);
        });
    }
}
import { ExpressServer } from './express';
import http = require('http');
import SocketIO = require('socket.io');
import { ChatServer } from './ChatServer';
import { SQLServer } from './SQLServer';

export class IOServer {
    private expressServer : ExpressServer; //express server
    private serverHTTP : http.Server;//apirest server
    private app: SocketIO.Server;
    private chatServers: Array<ChatServer>;
    private gSQLServer: SQLServer;
    private wasCleanedUp = false;
  
    constructor(private port : number, pathDatabase: string){
      //Server Express y API REST
      this.expressServer = ExpressServer.init(port);
      this.serverHTTP = http.createServer(this.expressServer.app);
      this.gSQLServer = new SQLServer(pathDatabase);
      this.chatServers = [];

      let originURL:string = "*";

      this.app = new SocketIO.Server(this.serverHTTP, {
        cors: {
          origin: originURL,
          methods: ["GET", "POST"]
        }
      });
      this.init();
    }
  
    start(){
      this.serverHTTP.listen(this.port, () => console.log("listening on http://localhost:"+this.port));
      this.loadChatServers();
      //Run function listener when close Node
      this.runBeforeExiting(()=>{
        console.log('clean my application, close the DB connection, etc');
        this.saveAllToDatabase();
      });
    }

    loadChatServers(){
      for (let i = 0; i < this.gSQLServer.totalServers; i++) {
        this.chatServers[i] = new ChatServer(this.app, this.gSQLServer, i);
      }
    }

    init(){
      //Nuevos usuarios se conectan a servidor
      this.app.on('connection', (socket) => {
        //Conexion a servidores de chat
        this.chatServers.forEach(chatServer => {
          chatServer.connect(socket);
        });
        //Usuario se desconecta del servidor
       /* socket.on("disconnect", (reason) => {
          const socketdata = socket.data as UserSocketData;
          this.chatServers[+socketdata.chat_id.split("x")].disconnect(socket, reason);
          console.log("ioserver.ts > init(): ",reason);
        });*/

        console.log("ioserver.ts        > init(): Usuario conectado a Servidor Chat ID", socket.eventNames()[0]);
      });
      //Usuario desconectado
    }

    //Listener finish Node Process By someone Signal
    private runBeforeExiting(fun: Function) {
      const exitSignals = ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException'];
      for (const signal of exitSignals) {
        process.on(signal as any, async () => { // eslint-disable-line @typescript-eslint/no-explicit-any
          if (!this.wasCleanedUp) {
            await fun();
            this.wasCleanedUp = true;
          }
          process.exit();
        });
      }
    };

    private saveAllToDatabase(){
      this.chatServers.forEach(chatServer => {
        chatServer.saveChatServer();
      });
    }
}
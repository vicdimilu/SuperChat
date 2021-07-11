import { ExpressServer } from './express';
import http = require('http');
import SocketIO = require('socket.io');
import { ChatServer } from './ChatServer';
import { UserSocketData } from '../user/UserPacket.struct';

export class IOServer {
    private expressServer : ExpressServer; //express server
    private serverHTTP : http.Server;//apirest server
    private app: SocketIO.Server;
    private chatServers: Array<ChatServer>;
  
    constructor(private port : number){
      //Server Express y API REST
      this.expressServer = ExpressServer.init(port);
      this.serverHTTP = http.createServer(this.expressServer.app);
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
    }

    loadChatServers(){
      const totalServers = 1;//cambiar despues a llamada servidor sql para que me entregue el total de chats de clientes
      for (let i = 0; i < totalServers; i++) {
        this.chatServers[i] = new ChatServer(this.app, i);
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

        console.log("ioserver.ts        > init(): Nuevo usuario conectado");
      });
      //Usuario desconectado

    }

  }
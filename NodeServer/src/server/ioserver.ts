import { ExpressServer } from './express';
import http = require('http');
import SocketIO = require('socket.io');
import { ProtocolCore } from '../protocol/protocolcore';

export class IOServer {
    private expressServer : ExpressServer; //express server
    private serverHTTP : http.Server;//apirest server
    private app: SocketIO.Server;
    private users: Array<SocketIO.Socket>;
    private protocol: ProtocolCore;
  
  
    constructor(private port : number){
        //Server Express y API REST
        this.expressServer = ExpressServer.init(port);
        this.serverHTTP = http.createServer(this.expressServer.app);

        let originURL:string = "http://127.0.0.1:"+port;

        this.app = new SocketIO.Server(this.serverHTTP, {
          cors: {
            origin: originURL,
            methods: ["GET", "POST"]
          }
        });
        this.protocol = new ProtocolCore();
        this.init();
    }
  
    start(){
      this.serverHTTP.listen(this.port, () => console.log("listening on http://localhost:"+this.port));
    }

    init(){

      this.users = [];

      this.app.on('connection', (socket) => {
        socket.on('chat message', (msg:string) => {
          this.app.emit('chat message', socket.id+": "+msg);
        });
      });

    }

  }
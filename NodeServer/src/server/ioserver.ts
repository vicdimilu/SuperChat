import { ExpressServer } from './express';
import http = require('http');
import SocketIO = require('socket.io');
import { ProtocolCore } from '../protocol/protocolcore';
import { User } from '../user/User';

export class IOServer {
    private expressServer : ExpressServer; //express server
    private serverHTTP : http.Server;//apirest server
    private app: SocketIO.Server;
    private users: Array<User>;
    private protocol: ProtocolCore;
  
  
    constructor(private port : number){
      //Server Express y API REST
      this.expressServer = ExpressServer.init(port);
      this.serverHTTP = http.createServer(this.expressServer.app);

      let originURL:string = "*";

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
        this.users[socket.id] = new User(socket, this.app);
      });

    }

  }
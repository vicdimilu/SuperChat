import express = require('express');
import router from '../router/router';
import cors = require('cors');

export class ExpressServer {
  public app : express.Application;


  constructor(private port : number){
    this.app = express();
    //Rutero y CORS para express
    this.app.use(router);
    this.app.use(cors());
  }

  start(callback ?: ()=>void){
    this.app.listen(this.port, "localhost", 0, callback)
  }

  static init(port : number) : ExpressServer{
    return new ExpressServer(port);
  }
}
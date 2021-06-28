import { Router, Request, Response } from 'express';
import * as path from 'path';

const router = Router();

router.get('/',(req : Request, res: Response)=>{
  res.send('Bienvenidos al servidor de SUPER Chat. En esta web iré posteando todas las estructuras utilizadas por el servidor, como tambien las peticiones APIRest utilizadas por super chat.');
});

router.get('/client', (req: Request, res: Response)=> {
  res.sendFile(path.resolve("./client/index.html"));
});

export default router;
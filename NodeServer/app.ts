import { IOServer } from './src/server/ioserver';

const PORT = 5000;
const pathDatabase = './src/database/datas/';
const ioServer = new IOServer(PORT, pathDatabase);

ioServer.start();

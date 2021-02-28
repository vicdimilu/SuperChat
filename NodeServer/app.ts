import { IOServer } from './src/server/ioserver';

const PORT = 3000;
const ioServer = new IOServer(PORT);

ioServer.start();

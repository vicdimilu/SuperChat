import { IOServer } from './src/server/ioserver';

const PORT = 5000;
const ioServer = new IOServer(PORT);

ioServer.start();

import * as IOSocket from "socket.io-client";
import socketIOClient from "socket.io-client";
import { _ConsoleLog } from "./DevConsoleController";
import { ChatAPI, UserPacketResponse } from "./State.Interface";
import { _UserGetProfile } from "./UserController";
import { _Protocol } from "./UserProtocolController";

let socket: IOSocket.Socket;
let isLoadUserSocketListeners: boolean = false;
let arrayHandleFunctionsPacketRecv: Array<any> = [];//Array de todas las funciones subscritas

export const _InitUserSocketController = (ENDPOINT: string) => { 
    socket = socketIOClient(ENDPOINT);
    _ConsoleLog("UserSocketController.ts > _InitUserSocketController(): Controlador cargado correctamente -> Socket Conectado en ", ENDPOINT);
}

export const _UserSocketDisconnect = () => {      
    socket.disconnect();
    _ConsoleLog("UserSocketController.ts > _UserSocketDisconnect(): Se ha desconectado del controlador de sockets.");
}

export const _UserSocketSendRequest = (request: any) => {
    socket.emit(ChatAPI.API_CODE, request);
    _ConsoleLog("UserSocketController.ts > _UserSocketSendRequest(): Packete enviado correctamente.", request);
}

export const _UserSocketSubscribe = (actionId: number, _HandleFunctionPacketRecv: any) => {
    if(!socket){ 
        return true;
    }
    if(!isLoadUserSocketListeners){
        arrayHandleFunctionsPacketRecv[actionId] = _HandleFunctionPacketRecv;
        socket.on(ChatAPI.API_CODE, (response: UserPacketResponse) => {
            _ConsoleLog("UserSocketController.ts > _UserSocketSendRequest(): Packete Recibido correctamente.", response);
            _Protocol(_UserGetProfile(), response, arrayHandleFunctionsPacketRecv);
        });
        isLoadUserSocketListeners = true;
        return true;
    }
    arrayHandleFunctionsPacketRecv[actionId] = _HandleFunctionPacketRecv;
    _ConsoleLog("UserSocketController.ts > _UserSocketSubscribe(): Se ha subscrito al controlador de manera exitosa.");
}

export const _UserSocketGetArrayHandleFunctions = () => {
    return arrayHandleFunctionsPacketRecv;
}
import { _ConsoleLog, _DevConsoleSet } from './DevConsoleController';
import {_InitUserController} from './UserController';
import {_InitUserSocketController} from './UserSocketController';

export const _InitControllers = (ENDPOINT: string, devConsole?: boolean) => {
    _DevConsoleSet((devConsole)?devConsole:false);
    _ConsoleLog("Controllers.ts > _InitControllers(): Cargando Controladores...");
    _InitUserController();
    _InitUserSocketController(ENDPOINT);
}
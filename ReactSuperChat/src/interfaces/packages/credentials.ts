import { Room } from './room';
import { ServerRequest } from './request';

export interface Login extends ServerRequest {
    user: string,
    password: string
}
export interface Register extends Login {
    email: string
    nick: string
}
export interface PasswordChange extends ServerRequest  {
    email: string
}
export interface CredentialResponse {
    nick: string,
    result: boolean,
    friendList: Array<string>,
    roomList: Array<Room>,
}

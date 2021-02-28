import { IOServer } from "../server/ioserver";
import { ClientRequest } from "./structures";

export class ProtocolCore {

    constructor() {
    }

    loadRequest(request: ClientRequest){
        switch (request.head.substring(0,2)) {
            case '0x':
                
                break;

            case '1x':

                break;

            default:
                break;
        }
    }
}
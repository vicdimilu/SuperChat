import { IOServer } from "../server/ioserver";
import { ClientRequest } from "./structures";

export class ProtocolCore {

    constructor() {
    }

    loadRequest(request: ClientRequest){
        switch (request.head.substring(0,2)) {
            case '0x':
                switch (+request.head.substring(3)) {
                    case 0://Anonymous
                        
                        break;
                    case 1://Anonymous
                        break;
                    case 2://Anonymous
                        break;
                    case 3://Anonymous
                        break;
                    case 4://Anonymous
                        break;
                    default:
                        break;
                }
                
                break;

            case '1x'://Servidor de chat
                
                break;

            default:
                break;
        }
    }
}
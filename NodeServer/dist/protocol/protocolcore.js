"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolCore = void 0;
var ProtocolCore = (function () {
    function ProtocolCore() {
    }
    ProtocolCore.prototype.loadRequest = function (request) {
        switch (request.head.substring(0, 2)) {
            case '0x':
                break;
            case '1x':
                break;
            default:
                break;
        }
    };
    return ProtocolCore;
}());
exports.ProtocolCore = ProtocolCore;
//# sourceMappingURL=protocolcore.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOServer = void 0;
var SocketIO = require("socket.io");
var protocolcore_1 = require("../protocol/protocolcore");
var IOServer = (function () {
    function IOServer(port) {
        this.port = port;
        this.server = new SocketIO.Server(this.port, {
            path: "/test",
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false
        });
        this.protocol = new protocolcore_1.ProtocolCore();
        this.init();
    }
    IOServer.prototype.start = function () {
        this.server.listen(this.port);
    };
    IOServer.prototype.init = function () {
        var _this = this;
        this.server.on('connection', function (socket) {
            _this.users.push(socket);
            socket.emit("hola", "hola mundo");
        });
    };
    return IOServer;
}());
exports.IOServer = IOServer;
//# sourceMappingURL=ioserver.js.map
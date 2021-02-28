"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
var express = require("express");
var router_1 = require("../router/router");
var cors = require("cors");
var ExpressServer = (function () {
    function ExpressServer(port) {
        this.port = port;
        this.app = express();
        this.app.use(router_1.default);
        this.app.use(cors());
    }
    ExpressServer.prototype.start = function (callback) {
        this.app.listen(this.port, "localhost", 0, callback);
    };
    ExpressServer.init = function (port) {
        return new ExpressServer(port);
    };
    return ExpressServer;
}());
exports.ExpressServer = ExpressServer;
//# sourceMappingURL=express.js.map
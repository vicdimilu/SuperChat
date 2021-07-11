"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send('Bienvenidos al servidor de SUPER Chat. En esta web iré posteando todas las estructuras utilizadas por el servidor, como tambien las peticiones APIRest utilizadas por super chat.');
});
exports.default = router;
//# sourceMappingURL=router.js.map
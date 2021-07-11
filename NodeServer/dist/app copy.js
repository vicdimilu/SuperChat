"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
const express = require("express");
const http = require("http");
// Create a new express application instance
const app = express();
const httpApp = http.createServer(app);
const PORT = 5000;
app.get('/login', function (req, res) {
    res.send("HELLO WORLD5!");
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=app%20copy.js.map
// lib/app.ts
import express = require('express');
import http = require('http');
import cors = require('cors');

// Create a new express application instance
const app: express.Application = express();
const httpApp = http.createServer(app);
const PORT = 5000;

app.get('/login', function (req, res) {
  res.send("HELLO WORLD5!");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
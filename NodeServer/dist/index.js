//Creamos instancia para iniciar servidores
const app = require('express')()
//Creamos instancia de Servidor HTTP para escuchar peticiones
const http = require('http').createServer(app)
//Creamos instancia de CORS
const cors = require('cors')
//Guardamos el puerto en variable
const PORT = process.env.PORT || 5000

//Creamos instancia de SOCKET IO y pasamos servidor para escuchar peticiones
const io = require('socket.io')(http)

//Obligamos uso de CORS
app.use(cors())

//Abrimos servidor de Socket
io.on('connection', (socket) => {
    socket.emit('hello', 'world');
    socket.on("login", ({name, room}, callback) => {
    
    })
    socket.on("sendMessage", message => {
    
    })
    socket.on("disconnect", () => {
    
    })
})

//Abrimos direccionamiento de peticiones
app.get('/', (req, res) => {
    res.send(io.PORT);
})

//Abrimos puerto de escucha
http.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
})
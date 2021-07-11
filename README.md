# SuperChat 
Sitio Web de Salas de Chat 

Proyecto se separará en dos:
1. Frontend basado en React + websocket.
2. Backend basado en NodeJS + ExpressJS + websocket.

Base proyecto en REACT: [LINK](https://www.newline.co/fullstack-react/articles/using-create-react-app-with-a-server/)
Base Semántica de Versiones: [LINK](https://semver.org/lang/es/)

## Authors
Ellie Sacchi Van Broock
Diego López Almerasdeolmiera

## Available Scripts

In the project directory, you can run:

### `npm run start`

Run frontend client websocket app in the development mode. <br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run dev`

Run backend app in the development mode. <br />
Use [http://localhost:5000](http://localhost:5000) to view it in the browser or for connect to websocket server from a frontend client.

## Tareas Restantes

- Averiguar doble conexion de socket para mismo usuario en ioserver.ts > init().
- Completar funciones de las salas de chat (Room > RoomManager).
- Completar funciones de registro (User > UserManager).
- Crear conexión de SQLlite3 (server > SQLServer).
- Crear ORM de SQLlite3 (crear archivo con nombre ORM o SQLManager, etc. piensalo xD).
- Completar funciones del Protocolo de los Chats (protocol > ChatProtocol)
- Cambiar a todos los eventos de Socket.IO.Socket.Emit() la variable response, esta debe estar perfectamente tipeada con su interface correspondiente, siempre mantener la estructura de interfaces. (User > UserManager)

### `Documentación relevante de Socket.IO (v3.0 sirve la mayoria para la v4.0)`
- sobre el envío de mensajes a clientes, salas, etc. [CLICK](https://socket.io/docs/v3/emit-cheatsheet/index.html)
- Server API [CLICK](https://socket.io/docs/v3/server-api/index.html)
- broadcasting events [CLICK](https://socket.io/docs/v3/broadcasting-events/)
- Rooms [CLICK](https://socket.io/docs/v3/rooms/index.html)
- Client API [CLICK](https://socket.io/docs/v3/client-api/index.html)

## Desafios futuros

- Hacer un servidor de websocket solo para realizar guardado de datos en la base de datos, de esta manera puedo quitar la carga del guardado de datos en un solo servidor. Utilizar funcion [Server Side Emit](https://socket.io/docs/v4/server-instance/#serverSideEmit) para la comunicación entre servidores web sockets.

- Utilizar Middleware para autenticaciones u otras cosas. Se puede encontrar mas informacion en [Socket.IO Middleware](https://socket.io/docs/v4/middlewares/)

- Forzar desconexion del cliente desde el servidor.
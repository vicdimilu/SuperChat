"use strict";
//=======================================================
// SERVIDOR -- Procesamiento de datos
//=======================================================
//paquete sesion aprobado - rechazadaa
function login(user, password) {
    let vars = {
        user,
        password
    };
    let response = socketio(vars);
    if (response.status) {
        //haces algo
        let loginResponse = response.body;
        return "Bienvenido " + loginResponse.name + " " + loginResponse.lastname;
    }
    return "";
}
function socketio(senderVar) {
    return {
        token: "aslfkhasfjknsdbhjihasodkasf",
        body: "asdasd",
        status: true
    };
}
//# sourceMappingURL=struct.js.map
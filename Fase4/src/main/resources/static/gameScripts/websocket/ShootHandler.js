var shootSocket;

// Obtiene la dirección del servidor desde la URL actual de la página
var serverIP = window.location.hostname;

var createShootSocket = function () {
    // Utiliza plantillas literales con backticks
    shootSocket = new WebSocket(`ws://${serverIP}:8080/payback/shoot`);

    shootSocket.onopen = function () {
        console.log("Websocket de disparos creado");
    };

    shootSocket.onerror = function (e) {
        console.log("ERROR: " + e);
    };

    shootSocket.onclose = function () {
        console.log("Cerrando shoot socket...");
    };

    shootSocket.sendWS = function (id) {
        let message = {
            idPlayer: id
        };
        var msg = JSON.stringify(message);
        shootSocket.send(msg);
    };

    shootSocket.onmessage = function (msg) {
        var data = JSON.parse(msg.data);

        if (data.idPlayer == 1) {
            p2_isShooting = true;
        }
        if (data.idPlayer == 2) {
            p1_isShooting = true;
        }
    };
};

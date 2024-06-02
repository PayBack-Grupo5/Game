var heartSocket;

var createHeartSocket = function () {
    heartSocket = new WebSocket("ws://localhost:8080/payback/shoot");

    heartSocket.onopen = function () {
        console.log("Websocket de disparos creado");
    }

    heartSocket.onerror = function (e) {

        console.log("ERROR: " + e);
    }

    heartSocket.onclose = function () {
        console.log("Cerrando shoot socket...")
    }

    heartSocket.sendWS = function (heartX, heartY) {

        let message = {
            lifeX : heartX,
            lifeY : heartY
        };
        var msg = JSON.stringify(message);

        heartSocket.send(msg);

    }

    heartSocket.onmessage = function (msg) {

        var data = JSON.parse(msg.data);

        lifeItemX = data.lifeX
        lifeItemY = data.lifeY
    }


}
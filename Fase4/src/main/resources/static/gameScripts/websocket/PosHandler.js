var posSocket;
var posSocketCreated = false;


createPosSocket = function () {
    posSocket = new WebSocket("ws://localhost:8080/payback/position");

    posSocket.onopen = function () {
        console.log("Websocket de posicion creado");
        posSocketCreated = true;
    }

    posSocket.onerror = function (e) {

        console.log("ERROR: " + e);
    }

    posSocket.onclose = function () {
        console.log("Cerrando position socket...")
    }

    posSocket.sendWS = function (x, y, dir, id, idleBool) {

        let message = {
            p_x: x,
            p_y: y,
            dir: dir,
            idPlayer: id,
            idle: idleBool
        };
        var msg = JSON.stringify(message);
        
        posSocket.send(msg);

    }

    posSocket.onmessage = function (msg) {

        var data = JSON.parse(msg.data);

        if (data.idPlayer == 2) {
            xP2 = data.p_x
            yP2 = data.p_y
            lastP1direction = data.dir
            p2_isIdle = data.idle
        }
        if (data.idPlayer == 1) {
            xP1 = data.p_x
            yP1 = data.p_y
            lastP2direction = data.dir
            p1_isIdle = data.idle

        }
    }

}





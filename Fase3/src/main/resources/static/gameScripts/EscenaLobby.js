class Lobby extends Phaser.Scene {
    constructor() {
        super("Lobby");
        this.botonMenu;
    }

    /*initialize() {
        Phaser.Scene.call(this, { key: 'Lobby' });
    }*/

    preload() {
        this.load.html("form", "form.html");
        this.load.image('background', 'assets/images/nocheEstrellas.jpg');
        this.load.image('botonReiniciar', 'assets/images/reiniciar.png'); 
    }

    create() {
        
        this.idOfExitedPlayer = 0;
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.style = { font: "15px OCR A", fill: "#FFFFFF" };
        this.nameInput = this.add.dom(400, 325).createFromCache("form");

        // Añadir imagen de fondo
        this.add.image(400, 300, 'background').setOrigin(0.5, 0.5).setDepth(-1).setScale(2.4);

        // Añadir botón de reinicio
        var botonVolver = this.add.image(700, 550, 'botonReiniciar').setInteractive();

        botonVolver.on('pointerdown', () => {
            this.scene.bringToTop('MainMenuScene');
            this.scene.start('MainMenuScene');
        });

        botonVolver.on('pointerover', () => {
            botonVolver.setScale(1.2);
        });

        botonVolver.on('pointerout', () => {
            botonVolver.setScale(1);
        });

        // Configurar llamadas AJAX
        this.setupAjaxCalls();

    }

    setupAjaxCalls() {
        /////////////////////
        //////JUGADORES//////
        /////////////////////

        function Players() {
            $.ajax({
                method: "GET",
                url: window.location.href + 'lobby/valor',
            }).done(function (value) {
                playerCount = value;
                console.log(playerCount);
            });
        }

        function createPlayer(player, callback) {
            playerCount++;
            console.log(playerCount);
            $.ajax({
                method: "POST",
                url: window.location.href + 'lobby',
                data: JSON.stringify(player),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
            }).done(function (player) {
                console.log("Se ha unido el siguiente jugador: " + JSON.stringify(player));
                id = player.id;
                callback(player);
                $('#info-players').append('<div><span>' + "Espera " + player.username + ", te estás conectado..." + '</span>');
            });
        }

        function showPlayer(player) {
            $('#info-players').append('<div id="' + playerUsername + '"><span style="color:red">' + player.username + " está online " + '</span></div>');
        }

        setInterval(function getJugador(total) {
            for (var i = 0; i <= total; i++) {
                $.ajax({
                    method: 'GET',
                    url: window.location.href + 'lobby/' + i
                }).done(function (player) {
                    console.log("Jugador " + JSON.stringify(player));
                }).fail(function () {
                    console.log("Jugador con id " + i + " no encontrado");
                });
            }
        }, 3000);

        function deletePlayer(playerId) {
            playerCount--;
            $.ajax({
                method: 'DELETE',
                url: window.location.href + 'lobby/' + playerId
            }).done(function (player) {
                console.log("Se ha salido del lobby el siguiente jugador: " + JSON.stringify(player));
                $('#info-players').append('<div><span>' + "Desconectando..." + '</span></div>');
            });
        }

        ////////////////////
        //////MENSAJES//////
        ////////////////////

        function createMessage(message, callback) {
            $.ajax({
                method: "POST",
                url: window.location.href + 'lobby/mensaje',
                data: JSON.stringify(message),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
            }).done(function (message) {
                console.log("Se ha escrito el siguiente mensaje: " + JSON.stringify(message));
                callback(message);
            });
        }

        function showMessage(message) {
            $('#chat').append('<div style="color:white"><span>' + message.content + '</span></div>');
        }

        $(document).ready(function () {
            $("#button-connect").click(function () {
                document.getElementById('divDisconnect').style.display = 'inline-block';
                var test_username = document.querySelector('#info-players');
                var uName = test_username.querySelector('input[name="username"]').value;
                playerUsername = uName;
                var player = { username: playerUsername };
                createPlayer(player, function (player) {
                    showPlayer(player);
                });
                window.onbeforeunload = function () {
                    deletePlayer(id);
                };

                Players();

                setInterval(function loadChat() {
                    $('#chat').empty();
                    $.ajax({
                        method: "GET",
                        url: window.location.href + 'lobby'
                    }).done(function (chat) {
                        for (var i = 0; i < chat.length; i++) {
                            $('#chat').append('<div><span>' + chat[i] + '</span></div>');
                        }
                    });
                }, 3000);

                setInterval(function loadPlayers() {
                    $('#info-players').empty();
                    $.ajax({
                        url: window.location.href + 'lobby/jugadores'
                    }).done(function (Player) {
                        for (var i = 0; i < Player.length; i++) {
                            showPlayer(Player[i]);
                        }
                    });
                }, 3000);
            });

            $("#dis-button").click(function () {
                deletePlayer(id);
                location.reload();
            });

            $("#send-button").click(function () {
                var test = document.querySelector('#input-form');
                var name = test.querySelector('input[name="name"]');
                var message = { content: playerUsername + ": " + name.value };
                name.value = "";
                createMessage(message, function (msg) {
                    showMessage(msg);
                });
            });
        });
    }

    update() {
    }
}

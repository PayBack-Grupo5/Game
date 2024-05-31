class Lobby extends Phaser.Scene {
    constructor() {
        super("Lobby");
        this.botonMenu;
        this.playerUsername = null; // Definimos playerUsername
        this.id = null; // Definimos id
        this.playerCount = 0; // Definimos playerCount
    }

    preload() {
        this.load.html('form', 'form.html'); // Asegúrate de que la ruta es correcta
        this.load.image('background', 'assets/images/nocheEstrellas.jpg'); // Asegúrate de que la imagen exista
    }

    create() {
        // Añadir imagen de fondo
        this.add.image(400, 300, 'background').setOrigin(0.5, 0.5).setDepth(-1).setScale(2.7);

        // Crear y mostrar el formulario
        this.nameInput = this.add.dom(400, 300).createFromCache('form'); // Ajustar posición

        // Inicializar teclas
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // Configurar llamadas AJAX
        this.setupAjaxCalls();
    }

    setupAjaxCalls() {
        /////////////////////
        //////JUGADORES//////
        /////////////////////

        const Players = () => {
            $.ajax({
                method: "GET",
                url: window.location.href + 'lobby/valor',
            }).done((value) => {
                this.playerCount = value; // Asegurarse de que se usa this.playerCount
                console.log(this.playerCount);
            });
        }

        const createPlayer = (player, callback) => {
            this.playerCount++; // Asegurarse de que se usa this.playerCount
            console.log(this.playerCount);
            $.ajax({
                method: "POST",
                url: window.location.href + 'lobby',
                data: JSON.stringify(player),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
            }).done((player) => {
                console.log("Se ha unido el siguiente jugador: " + JSON.stringify(player));
                this.id = player.id; // Asegurarse de que se usa this.id
                callback(player);
                $('#info-players').append('<div><span>' + "Espera " + player.username + ", te estás conectando..." + '</span></div>');
            });
        }

        const showPlayer = (player) => {
            $('#info-players').append('<div id="' + player.username + '"><span style="color:green">' + player.username + " está online " + '</span></div>');
        }

        setInterval(function getJugador(total) {
            for (var i = 0; i <= total; i++) {
                $.ajax({
                    method: 'GET',
                    url: window.location.href + 'lobby/' + i
                }).done((player) => {
                    console.log("Jugador " + JSON.stringify(player));
                }).fail(() => {
                    console.log("Jugador con id " + i + " no encontrado");
                });
            }
        }, 3000);

        const deletePlayer = (playerId) => {
            this.playerCount--; // Asegurarse de que se usa this.playerCount
            $.ajax({
                method: 'DELETE',
                url: window.location.href + 'lobby/' + playerId
            }).done((player) => {
                console.log("Se ha salido del lobby el siguiente jugador: " + JSON.stringify(player));
                $('#info-players').append('<div><span>' + "Desconectando..." + '</span></div>');
            });
        }

        ////////////////////
        //////MENSAJES//////
        ////////////////////

        const createMessage = (message, callback) => {
            $.ajax({
                method: "POST",
                url: window.location.href + 'lobby/mensaje',
                data: JSON.stringify(message),
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                }
            }).done((message) => {
                console.log("Se ha escrito el siguiente mensaje: " + JSON.stringify(message));
                callback(message);
            });
        }

        const showMessage = (message) => {
            $('#chat').append('<div style="color:white"><span>' + message.content + '</span></div>');
        }

        $(document).ready(() => {
            $("#button-connect").click(() => {
                document.getElementById('divDisconnect').style.display = 'inline-block';
                var uName = document.querySelector('input[name="username"]').value;
                this.playerUsername = uName;
                var player = { username: this.playerUsername };
                createPlayer(player, (player) => {
                    showPlayer(player);
                });
                window.onbeforeunload = () => {
                    deletePlayer(this.id);
                };
                Players();

                setInterval(function loadChat() {
                    $('#chat').empty();
                    $.ajax({
                        method: "GET",
                        url: window.location.href + 'lobby'
                    }).done((chat) => {
                        for (var i = 0; i < chat.length; i++) {
                            $('#chat').append('<div><span style="color:white">' + chat[i] + '</span></div>');
                        }
                    });
                }, 3000);

                setInterval(function loadPlayers() {
                    $('#info-players').empty();
                    $.ajax({
                        url: window.location.href + 'lobby/jugadores'
                    }).done((Player) => {
                        for (var i = 0; i < Player.length; i++) {
                            showPlayer(Player[i]);
                        }
                    });
                }, 3000);
            });

            $("#dis-button").click(() => {
                deletePlayer(this.id);
                location.reload();
            });

            $("#send-button").click(() => {
                var name = document.querySelector('input[name="name"]').value;
                var message = { content: this.playerUsername + ": " + name };
                document.querySelector('input[name="name"]').value = ""; // Limpiar el campo de entrada
                createMessage(message, (msg) => {
                    showMessage(msg);
                });
            });
        });
    }

    update() {
        if (this.returnKey.isDown) {
            this.scene.start('MainMenuScene');
        }
    }
}

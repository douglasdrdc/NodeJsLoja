var app = require('./config/express')();
var http = require('http').Server(app); // Carrega o http somente por conta do socket
var io = require('socket.io')(http);

app.set('io', io);

http.listen(3000, function(){
    console.log('Servidor rodando');
});

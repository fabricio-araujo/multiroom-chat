//import server config
var app = require('./config/server.js');

//listen port
var server= app.listen(80, function() {
    console.log('Server online');
})

var io = require('socket.io').listen(server);

app.set('io', io);

//create websocket connection
io.on('connection', function(socket) {
    console.log('User connected');

    socket.on('disconnect', function() {
        console.log('User disconnected');
    });

    socket.on('msgToServer', function(data){
        //dialog
        socket.emit(
            'msgForClient',
            {nickname: data.nickname, message: data.message}
        );
        socket.broadcast.emit(
            'msgForClient',
            {nickname: data.nickname, message: data.message}
        );

        //participants
        if(parseInt(data.nickname_updated) == 0) {
            socket.emit(
                'participantsForClient',
                {nickname: data.nickname}
            );
            socket.broadcast.emit(
                'participantsForClient',
                {nickname: data.nickname}
            );
        }
    });
});
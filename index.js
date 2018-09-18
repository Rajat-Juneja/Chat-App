const express = require('express');
const socket = require('socket.io');
var app = express();

app.use(express.static('public'));
users=[];
connections=[];

var server = app.listen(process.env.PORT||5000,()=>{
    console.log(server.address().port);
});

const io = socket(server);

io.sockets.on('connection',function(socket){
    connections.push(socket);
    console.log("Connected are "+connections.length);

    socket.on('disconnect',function(data){
        users.splice(users.indexOf(socket.username),1);
        connections.splice(connections.indexOf(socket,1));
        console.log("Disconnected , Total connections left are "+connections.length);
        io.sockets.emit('disconnected',users);
    })

    socket.on('send message',function(data){
        console.log(data);
        io.sockets.emit('new message',{msg:data,user:socket.username});
    })

    socket.on('new user',function(data,callback){
        callback(true);
        socket.username=data;
        users.push(socket.username);
        updateNames();
    })
})

function updateNames(){
    io.sockets.emit('get users',users);
}




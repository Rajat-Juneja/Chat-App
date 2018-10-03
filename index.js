require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const passport = require('passport');
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
var cors = require('cors')

const news = require('./routes/api/news');
const auth = require('./routes/api/auth');

const app = express();

app.use(cors());
mongoose.connect('mongodb://localhost:27017/minor-news-app', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to Database');
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: "Its a secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
require('./passport/passport-local');
users=[];
connections=[];

app.use('/auth', auth);
app.use('/api/news', news); 

var server = app.listen(process.env.PORT||5000, () => {
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




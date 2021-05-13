const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server } = require("socket.io");
const io = new Server(server);
require('dotenv/config');

app.use(bodyParser.json());

// Import routes
const postRoutes = require('./routes/posts');
const authRoute = require('./routes/auth');
// const chatRoutes = require('./routes/chat');
let userName = null;
let userOnline = [];

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    () => console.log('connected to DB!')
);

// Middlewares
app.use(cors());
app.use('/api/user', authRoute);
app.use('/api/posts', postRoutes);
// app.use('/api/chats', chatRoutes);

// Tienes la habilidad de crear //ROUTES
app.get('/:userName', (req, res) => {
    userName = req.params.userName;
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {

    const id = socket.handshake.query;
    console.log(`User ${socket.id} connected`);

    // socket.broadcast.emit('hi');

    // if (!userOnline.includes(userName)) {
    //     userOnline.push(userName);
    // }
    // io.emit(`userOnline`, { usersOnline: userOnline, userName: userName});
    // // This will emit the event to all connected sockets
    // io.emit(`${userName}`, { name: userName, status: 'Online' });
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    
    socket.on('disconnect', (socket) => {
        console.log(`User disconnect`);
        // userOnline = userOnline.filter(function(value, index, arr){ 
        //     return value != userName;
        // });
        // io.emit(`userOnline`, userOnline);
        // io.emit(`${userName}`, { name: 'Eliberto Subias', status: 'offline' });
    });
});   


// Como comenxar a ecuchar el servidor
server.listen(3000, () => {
    console.log('listening on *:3000')
});
// app.listen(3000);
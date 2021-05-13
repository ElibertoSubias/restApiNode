const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const router = express.Router();
const { Server } = require("socket.io");
const io = new Server(server);

const userName = null;

// SPECIFIC POST
router.get('/:userName', async (req, res) => {
    try {
        userName = req.params.userName;

    } catch (err) {
        res.json({
            message: err
        });
    }
});

io.on('connection', (socket) => {
    
    console.log('a user connected');

    // socket.broadcast.emit('hi');

     // This will emit the event to all connected sockets
    io.emit('user online', { name: 'Eliberto Subias', status: 'Online' });
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    
    socket.on('disconnect', () => {
        io.emit('user online', { name: 'Eliberto Subias', status: 'offline' });
    });
});

module.exports = router;
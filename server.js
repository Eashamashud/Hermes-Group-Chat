/** 
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" folder
app.use(express.static('public'));

// List to track active groups
const activeGroups = new Set();

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        console.log('Message: ' + msg);

        // Listen for a user joining a group
        socket.on('joinGroup', (room) => {
        socket.join(room);
        activeGroups.add(room);
        console.log(`User ${socket.id} joined group: ${room}`);
        socket.emit('message', `You joined group: ${room}`);

        // Send updated group list to all connected clients
        io.emit('updateGroups', Array.from(activeGroups));
    });

    // Handle chat messages for a specific group
        socket.on('chat message', ({ room, message, username }) => {
        console.log(`Message in group ${room}: ${username}: ${message}`);
        io.to(room).emit('chat message', { username, message });
    });


        // Broadcast message to all clients
        //io.emit('chat message', msg);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
*/



const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" folder
app.use(express.static('public'));

// List to track active groups
const activeGroups = new Set();



// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle user joining a group
    socket.on('joinGroup', (room) => {
        socket.join(room);
        activeGroups.add(room); // Add the group to the active groups list
        console.log(`User ${socket.id} joined group: ${room}`);
        socket.emit('message', `You joined group: ${room}`);

        // Send updated group list to all connected clients
        io.emit('updateGroups', Array.from(activeGroups));
    });

    // Handle user disconnecting
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

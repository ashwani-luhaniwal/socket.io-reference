/**
 * -----------------------------
 * Socket.IO - Chat Application
 * -----------------------------
 * Now that we are well acquainted with Socket.IO, let us write a chat application, which we can use 
 * to chat on different chat rooms. We will allow users to choose a username and allow them to chat 
 * using them.
 */
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendfile('documentation/Chat App/index.html');
});

// let us create the server to accept connections from the client. We will allow people to send their 
// chosen usernames using the setUsername event. If a user exists, we will respond by a userExists event, 
// else using a userSet event.
users = [];
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('setUsername', (data) => {
        console.log(data);

        if (users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! Try some other username');
        } else {
            users.push(data);
            socket.emit('userSet', {username: data});
        }
    });

    // we have to handle and direct the messages to the connected client.
    socket.on('msg', (data) => {
        // Send message to everyone
        io.sockets.emit('newmsg', data);
    });
});

http.listen(3000, () => {
    console.log('listening on localhost:3000');
});
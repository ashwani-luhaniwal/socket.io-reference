/**
 * we will require Socket.IO and will log "A user connected", every time a user goes to this page and 
 * "A user disconnected", every time someone navigates away/closes this page.
 * 
 * The io.on event handler handles connection, disconnection etc events in it, using the socket object
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
// creates new socket.io instance attached to http server
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendfile('index.html');
});

// Whenever someone connects this gets executed
io.on('connection', (socket) => {
    console.log('A user connected');

    // Send a message after a timeout of 2 seconds
    /**
     * This will send an event called 'message(built in)' to our client, 4 seconds after the client
     * connects. The send function on socket object associates the 'message' event.
     */
    setTimeout(() => {
        socket.send('Send a message 4 seconds after connection!');
    }, 4000);

    // Whenever someone disconnects this piece of code executed
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *: 3000');
});
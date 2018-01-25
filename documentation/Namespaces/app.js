/**
 * -----------------------
 * Socket.IO - Namespaces
 * -----------------------
 * Socket.IO allows you to "namespace" your sockets, which essentially means assigning different 
 * endpoints or paths. This is a useful feature to minimize the number of resources (TCP connections) 
 * and at the same time separate concerns within your application by introducing separation between 
 * communication channels. Multiple namespaces actually share the same WebSockets connection thus saving 
 * us socket ports on the server.
 * 
 * Namespaces are created on the server side. However, they are joined by clients by sending a request 
 * to the server.
 * 
 * -------------------
 * Default Namespaces
 * -------------------
 * The root namespace '/' is the default namespace, which is joined by clients if a namespace is not 
 * specified by the client while connecting to the server. All connections to the server using the 
 * socket-object client side are made to the default namespace. For example −
 * 
 *      var socket = io();
 * 
 * This will connect the client to the default namespace. All events on this namespace connection will 
 * be handled by the io object on the server. All the previous examples were utilizing default namespaces 
 * to communicate with the server and back.
 */
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendfile('documentation/Namespaces/index.html');
});

let nsp = io.of('/my-namespace');
nsp.on('connection', (socket) => {
    console.log('someone connected');
    nsp.emit('hi', 'Hello everyone!');
});

http.listen(3000, () => {
    console.log('listening on localhost:3000');
});
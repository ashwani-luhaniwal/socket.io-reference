/**
 * -----------------------
 * Socket.IO - Error Handling
 * -----------------------
 * We have worked on local servers until now, which will almost never give us errors related to 
 * connections, timeouts, etc. However, in real life production environments, handling such errors are 
 * of utmost importance. Therefore, we will now discuss how we can handle connection errors on the client 
 * side.
 * 
 * The client API provides us with following built in events −
 *      Connect − When the client successfully connects.
 *      Connecting − When the client is in the process of connecting.
 *      Disconnect − When the client is disconnected.
 *      Connect_failed − When the connection to the server fails.
 *      Error − An error event is sent from the server.
 *      Message − When the server sends a message using the send function.
 *      Reconnect − When reconnection to the server is successful.
 *      Reconnecting − When the client is in the process of connecting.
 *      Reconnect_failed − When the reconnection attempt fails.
 * 
 * To handle errors, we can handle these events using the out-socket object that we created on our client.
 */
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendfile('documentation/ErrorHandling/index.html');
});

io.on('connection', (socket) => {
    
    console.log('A user is connected!');    

    socket.on('disconnect', () => {
        console.log('A user is disconnected!');
    });
});

http.listen(3000, () => {
    console.log('listening on localhost:3000');
});
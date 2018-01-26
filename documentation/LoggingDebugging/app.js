/**
 * ----------------------------------
 * Socket.IO - Logging and Debugging
 * ----------------------------------
 * Socket.IO uses a very famous debugging module developed by ExpresJS's main author, called debug. 
 * Earlier Socket.IO used to log everything to the console making it quite difficult to debug the 
 * problem. After the v1.0 release, you can specify what you want to log.
 * 
 * ------------
 * Server-side
 * ------------
 * The best way to see what information is available is to use the * −
 * 
 *      DEBUG=* node app.js
 * 
 * This will colorize and output everything that happens to your server console. For example, we can 
 * consider the following screenshot.
 * 
 * ------------
 * Client-side
 * ------------
 * Paste this to console, click enter and refresh your page. This will again output everything related 
 * to Socket.io to your console.
 * 
 *      localStorage.debug = '*';
 * 
 * You can limit the output to get the debug info with incoming data from the socket using the following 
 * command.
 * 
 *      localStorage.debug = 'socket.io-client:socket';
 */
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendfile('documentation/LoggingDebugging/index.html');
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
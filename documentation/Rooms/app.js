/**
 * -----------------------
 * Socket.IO - Rooms
 * -----------------------
 * Within each namespace, you can also define arbitrary channels that sockets can join and leave. These 
 * channels are called rooms. Rooms are used to further-separate concerns. Rooms also share the same 
 * socket connection like namespaces. One thing to keep in mind while using rooms is that they can 
 * only be joined on the server side.
 * 
 * --------------
 * Joining Rooms
 * --------------
 * You can call the join method on the socket to subscribe the socket to a given channel/room. For 
 * example, let us create rooms called 'room-<room-number>' and join some clients. As soon as this room 
 * is full, create another room and join clients there.
 * 
 * Note − We are currently doing this on the default namespace, i.e. '/'. You can also implement this 
 * in custom namespaces in the same fashion.
 * 
 * To join a room you need to provide the room name as the argument to your join function call.
 */
let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendfile('documentation/Rooms/index.html');
});

let roomno = 1;
io.on('connection', (socket) => {
    
    // Increase roomno 2 clients are present in a room
    if (io.nsps['/'].adapter.rooms['room-' + roomno] && io.nsps['/'].adapter.rooms['room-' + roomno].length > 1) {
        roomno++;
    }
    // To join a room you need to provide the room name as the argument to your join function call.
    socket.join('room-' + roomno);

    // Send this event to everyone in the room
    io.sockets.in('room-' + roomno).emit('connectToRoom', 'You in room no. ' + roomno);

    socket.on('disconnect', () => {
        // To leave a room, you need to call the leave function just as you called the join function on 
        // the socket.
        socket.leave('room-' + roomno);
    });
});

http.listen(3000, () => {
    console.log('listening on localhost:3000');
});
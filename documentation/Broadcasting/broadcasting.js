/**
 * -------------------------
 * Socket.IO - Broadcasting
 * -------------------------
 * Broadcasting means sending a message to all connected clients. Broadcasting can be done at multiple 
 * levels. We can send the message to all the connected clients, to clients on a namespace and clients 
 * in a particular room. To broadcast an event to all the clients, we can use the io.sockets.emit method.
 * 
 * Note − This will emit the event to ALL the connected clients (event the socket that might have fired 
 * this event).
 * 
 * if we want to send an event to everyone, but the client that caused it (in the previous example, it 
 * was caused by new clients on connecting), we can use the socket.broadcast.emit.
 */
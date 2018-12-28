let express = require('express')
let app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

let server = require('http').Server(app)
io = require('socket.io')(server)
users = {}
server.listen(3000)

/**
 * When a new client connects to the server socket.io raises an event called connection. The connection 
 * event states that a new client has been connected to the server. This helps keep track of how many 
 * and what with the clients.
 */
io.sockets.on('connection', (socket) => {
    console.log('user connected')
    socket.on('new', (data, callback) => {
        console.log(data.name)
        if (data in users) {
            callback(false)
        } else {
            callback(true)
            socket.name = data.name
            users[socket.name] = socket
        }
    })
    socket.on('msg', (data, callback) => {
        callback(data.msg)
        io.to(users[data.to].emit('priv', data.msg))
    })
})
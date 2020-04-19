const db = require('./db') 
const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')

const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server)

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080

var totalUsers = 0;
var listUsers = []

io.on("connection", socket => {
    const { id } = socket.client;
    ++totalUsers;
    console.log(`User Connected: ${id}`);
    console.log(`Total Users Connected: ${totalUsers}`);

    socket.on('setUser', userName => {
        socket.userName = userName
        console.log(`[NEW USER] -- Username: ${socket.userName} -- SocketID: ${id}`)
        listUsers.push(userName)
        console.log(listUsers)
        io.emit('setUser', userName)
    })

    socket.on('joinRoom', roomName => {
        console.log(roomName)
        socket.join(roomName)
        console.log(`socket: ${id}, nickname: ${socket.userName}, room: ${roomName}`)
        io.sockets.in(roomName).emit('ola', `vc esta na room ${roomName}`)
    })


    socket.on("disconnect", () => {
        --totalUsers;
        console.log(`User Disconnected: ${id}`);
        console.log(`Total Users Connected: ${totalUsers}`);
    });
});


server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`)
})
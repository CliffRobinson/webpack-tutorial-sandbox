const log = require('loglevel') 

const socketInitChat = require('./chat')

module.exports = (http) => {
    const serverSocket = require('socket.io')(http)

    serverSocket.on('connection', (socket)=> {
        //////////////// Connect and Disconnect Events ////////////////
        log.info(`A user connected at ${new Date()}`)

        socket.on('disconnect', () => {
            log.info(`A user disconnected at ${new Date}`)
        })

        socketInitChat(socket, serverSocket)
    })

    return serverSocket
}
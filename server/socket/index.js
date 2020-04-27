const log = require('loglevel') 

const chatDb = require('../db/chat')

module.exports = (app) => {
    log.trace(`This is the socket, type of app is ${typeof app}`)
    const http = require('http').createServer(app)
    const io = require('socket.io')(http)

    io.on('connection', (socket)=> {
        //////////////// Connect and Disconnect Events ////////////////
        log.debug(`A user connected at ${new Date()}`)

        socket.on('disconnect', () => {
            log.debug(`A user disconnected at ${new Date}`)
        })

        /////////////// Chat /////////////////////
        socket.on('requestMessagesByRoom', (room_id) => {
            console.log(`socket is consulting db for messages in room ${room_id}`)
            chatDb.getChatMessagesByRoom(room_id)
                        .then(messages => {
                            log.debug(`just did getChatMessagesByRoom, emitting an array of ${messages.length}`)
                            socket.emit('receiveChatMessagesByRoom', messages)
                        })
        })

        socket.on('addChatMessage', (message) => {
            log.debug(`Gotta message, it is:`)
            log.debug(message)
            chatDb.addChatMessage(message)
                .then((result) => {
                    console.log(`result of add is: ${result}`)
                    chatDb.getChatMessages()
                        .then(messages => {
                            log.debug(`just did getChatMessagesByRoom for room ${message.room_id}, emitting an array of ${messages.length}`)
                            io.emit('receiveChatMessagesByRoom', messages) 
                        })
                })
        })
    })

    return io
}
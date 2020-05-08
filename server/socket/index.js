const log = require('loglevel') 
log.setLevel('trace')
const chatDb = require('../db/chat')

const {REQUEST_MESSAGES_BY_ROOM, ADD_CHAT_MESSAGE} = require('../../constants/socketEvents')

module.exports = (http) => {
    //log.trace(`This is the socket, type of app is ${typeof app}`)
    // const http = require('http').createServer(app)
    const io = require('socket.io')(http)

    io.on('connection', (socket)=> {
        //////////////// Connect and Disconnect Events ////////////////
        console.log(`A user connected at ${new Date()}`)

        socket.on('disconnect', () => {
            console.log(`A user disconnected at ${new Date}`)
        })

        /////////////// Chat /////////////////////
        socket.on(REQUEST_MESSAGES_BY_ROOM, (room_id) => {
            console.log(`socket is consulting db for messages in room ${room_id}`)
            chatDb.getChatMessagesByRoom(room_id)
                        .then(messages => {
                            console.log(`just did getChatMessagesByRoom, emitting an array of ${messages.length}`)
                            //socket.emit('receiveChatMessagesByRoom', messages)
                            io.emit('dispatch', {dispatchFunction: "receiveMessages", payload: messages})
                        })
        })

        socket.on(ADD_CHAT_MESSAGE, (message) => { //the message object contains what room it is from
            log.debug(`Gotta message, it is:`)
            log.debug(message)
            chatDb.addChatMessage(message)
                .then((result) => {
                    console.log(`result of add is: ${result}`)
                    chatDb.getChatMessages()
                        .then(messages => {
                            log.debug(`just did getChatMessagesByRoom for room ${message.room_id}, emitting an array of ${messages.length}`)
                            //io.emit('receiveChatMessagesByRoom', messages) 
                            io.emit('dispatch', {dispatchFunction: "receiveMessages", payload: messages})
                        })
                })
        })
    })

    return io
}
const log = require('loglevel')

const chatDb = require('../db/chat')
const {REQUEST_MESSAGES_BY_ROOM, ADD_CHAT_MESSAGE} = require('../../constants/socketEvents')

module.exports = (socket, serverSocket) => {
    /////////////// Chat /////////////////////
    socket.on(REQUEST_MESSAGES_BY_ROOM, (room_id) => {
        log.trace(`socket is consulting db for messages in room ${room_id}`)
        chatDb.getChatMessagesByRoom(room_id)
            .then(messages => {
                log.trace(`just did getChatMessagesByRoom, emitting an array of ${messages.length}`)
                //socket.emit('receiveChatMessagesByRoom', messages)
                serverSocket.emit('dispatch', { dispatchFunction: "receiveMessages", payload: messages })
            })
    })

    socket.on(ADD_CHAT_MESSAGE, (message) => { //the message object contains what room it is from
        log.trace(`Gotta message, it is:`)
        log.trace(message)
        chatDb.addChatMessage(message)
            .then((result) => {
                log.trace(`result of add is: ${result}`)
                chatDb.getChatMessagesByRoom(message.room_id)
                    .then(messages => {
                        log.trace(`just did getChatMessagesByRoom for room ${message.room_id}, emitting an array of ${messages.length}`)
                        //io.emit('receiveChatMessagesByRoom', messages) 
                        serverSocket.emit('dispatch', { dispatchFunction: "receiveMessages", payload: messages })
                    })
            })
    })
}
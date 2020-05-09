const log = require('loglevel') 
const chatDb = require('../db/chat')

const socketInitChat = require('./chat')

const {REQUEST_MESSAGES_BY_ROOM, ADD_CHAT_MESSAGE} = require('../../constants/socketEvents')

module.exports = (http) => {
    const serverSocket = require('socket.io')(http)

    serverSocket.on('connection', (socket)=> {
        //////////////// Connect and Disconnect Events ////////////////
        console.log(`A user connected at ${new Date()}`)

        socket.on('disconnect', () => {
            console.log(`A user disconnected at ${new Date}`)
        })

        socketInitChat(socket, serverSocket)
    })

    return serverSocket
}
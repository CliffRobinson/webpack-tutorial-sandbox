jest.mock('../db/chat', ()=> ({
    getChatMessages: () => new Promise((res, rej) => res(['some data'])),
    getChatMessagesByRoom: () => new Promise((res, rej) => res(['some data']))
}))

const log = require('loglevel')
log.setLevel('debug')

const express = require('express')
const server = express()
const socket = require('./index')(server)

//do I now need to spy on socket's emit?

const io = require('socket.io-client')
const socketPort = 1111
const listener = socket.listen(socketPort)

//console.log(Object.keys(listener))

test('???', (done) => {
    const client1 = io.connect(`http://0.0.0.0:${socketPort}`)
    console.log(Object.keys(client1))

    client1.emit('requestMessagesByRoom', 1)
    
    //done()
})

listener.close()
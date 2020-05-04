const log = require('loglevel')
log.setLevel('debug')

const express = require('express')
const server = express()
const socket = require('./index')(server)

const io = require('socket.io-client')
const socketPort = 1111
const listener = socket.listen(socketPort)

//console.log(Object.keys(listener))

test('???', (done) => {
    const client1 = io.connect(`http://0.0.0.0:${socketPort}`)
    console.log(Object.keys(client1))
    //client1.disconnect()
    expect(true).toEqual(true)
    
    done()
})

listener.close()
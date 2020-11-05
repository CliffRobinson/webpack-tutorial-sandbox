const log = require('loglevel')
const server = require("./server")
const http = require('http').createServer(server)
const socket = require('./socket')(http)
const {socketPort, serverPort} = require('../constants/ports')


const port = process.env.PORT || serverPort

log.setLevel("TRACE");

server.listen(port, () => {
    log.info(`Listening on port: ${port}`)
    log.info(`Now you have a delightful day, you charming genius`)
})

socket.listen(socketPort)
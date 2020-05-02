const log = require('loglevel')
const server = require("./server")
const socket = require('./socket')(server)
const {socketPort, serverPort} = require('../constants')


const port = process.env.PORT || serverPort

log.setLevel("trace");

server.listen(port, () => {
    log.info(`Listening on port: ${port}`)
    log.info(`Now you have a delightful day, you charming genius`)
})

socket.listen(socketPort)
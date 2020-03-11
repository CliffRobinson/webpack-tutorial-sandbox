const log = require('loglevel')
const server = require("./server")
const port = process.env.PORT || 3000

log.setLevel("info");

server.listen(port, () => {
    log.info(`Listening on port: ${port}`)
    log.info(`Now you have a delightful day, you charming genius`)
})
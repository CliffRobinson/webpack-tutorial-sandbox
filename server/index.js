const server = require("./server")
const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`Listening on port: ${port}`)
    console.log(`Now you have a delightful day, you charming genius`)
})
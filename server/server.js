const log = require('loglevel')
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const cors = require('cors')
const server = express();

server.use(cors('*'))

const userRoutes = require('./routes/user-routes')
const chatRoutes = require('./routes/chat-routes')

server.use(express.static(path.join(__dirname, "../dist")));
server.use(express.urlencoded({ extended: true }));
server.use(bodyParser.json())

server.use('/users', userRoutes)
server.use('/chat', chatRoutes)

const indexPath = path.join(__dirname, "../src/index.html");

//create a server object:
server
    .get("/", function(req, res) {
        log.trace(`Hitting the root of the app.`)
        res.status(200)
        res.sendFile(indexPath);
        //res.send('<h1>I am not the webpack script!</h1>')
    })

module.exports = server
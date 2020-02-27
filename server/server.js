const express = require("express");
const path = require("path");
const server = express();

const userRoutes = require('./routes/user-routes')

server.use(express.static(path.join(__dirname, "../dist")));
server.use(express.urlencoded({ extended: true }));

server.use('/users', userRoutes)

const indexPath = path.join(__dirname, "../src/index.html");

//create a server object:
server
    .get("/", function(req, res) {
        res.status(200)
        res.sendFile(indexPath);
        //res.send('<h1>I am not the webpack script!</h1>')
    })

module.exports = server
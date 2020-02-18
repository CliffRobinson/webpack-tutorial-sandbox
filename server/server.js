const express = require("express");
var path = require("path");

const server = express();
server.use(express.static(path.join(__dirname, "../dist")));
server.use(express.urlencoded({ extended: true }));

var indexPath = path.join(__dirname, "../src/index.html");

//create a server object:
server
    .get("/", function(req, res) {
        res.status(200)
        res.sendFile(indexPath);
    })

module.exports = server
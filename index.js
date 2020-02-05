const express = require("express");
var path = require("path");

const server = express();
server.use(express.static(path.join(__dirname, "dist")));
server.use(express.urlencoded({ extended: true }));

var indexPath = path.join(__dirname, "src/index.html");

//create a server object:
console.log("Creating Server!!");
server
  .get("/", function(req, res) {
    res.sendFile(indexPath);
  })
  .listen(8080); //the server object listens on port 8080

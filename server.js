const express = require("express");
var path = require("path");

const server = express();
var indexPath = path.join(__dirname, "src/index.html");
server.use(express.static(path.join(__dirname, "dist")));
server.use(express.urlencoded({ extended: true }));
console.log("The index path is: ", indexPath);

//create a server object:
//console.log("Creating Server!!");
server.get("/", function(req, res) {
  res.status(200);
  res.sendFile(indexPath);
  //res.send("<h1> LOL BUTTS LOL </h1>")
});
//.listen(8080); //the server object listens on port 8080

module.exports = server;

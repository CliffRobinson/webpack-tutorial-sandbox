const server = require("./server");

const port = process.env.PORT || 3000;
console.log("hello");
server.listen(port, function() {
  console.log("Server listening on port: ", port);
  console.log("Now have a lovely day, you muscular Socrates");
});

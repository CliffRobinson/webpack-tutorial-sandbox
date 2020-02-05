const path = require("path");

module.exports = {
  entry: "./src/LodashDomScript.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};

let path = require('path')
module.exports = {
  entry:"./lib/tree.js",
  mode: "production",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname,"dist"),
    library:'mkTree',
    libraryTarget:'umd'
  }
}
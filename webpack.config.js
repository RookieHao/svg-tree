let path = require('path')

let webpack = require('webpack')

module.exports = {
  entry: './lib/tree.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'tree.js',
    library: 'mkTree',
    libraryExport: "default",
    globalObject: 'this',
    libraryTarget: 'umd'
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'lib')
        ],
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
      // {
      //   test:/\.css$/,
      //   include: [
      //     path.resolve(__dirname, 'lib')
      //   ],
      //   exclude: /(node_modules|bower_components)/,
      //   /** style的形式插入 */

      //   // use:[
      //   //   "style-loader",
      //   //   "css-loader"
      //   // ]

      //   /** link的形式插入 */
      //   // use:[
      //   //   "style-loader/url",
      //   //   "file-loader"
      //   // ]
      // }
    ]
  },
}
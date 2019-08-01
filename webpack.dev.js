const path = require("path");

module.exports = {
  mode: "development",
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  entry: "./src/ymaps-touch-scroll.js",
  output: {
    filename: "ymaps-touch-scroll.dev.js",
    path: path.resolve(__dirname, "src"),
    library: "ymapsTouchScroll",
    libraryExport: "default",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  }
};
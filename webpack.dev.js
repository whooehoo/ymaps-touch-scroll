const path = require("path");

module.exports = {
  watchOptions: {
    ignored: /node_modules/
  },
  entry: "./src/ymaps-touch-scroll.js",
  output: {
    filename: "ymaps-touch-scroll.js",
    path: path.resolve(__dirname, "dist"),
    library: "ymapsTouchScroll",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            plugins: ["add-module-exports"]
          }
        }
      }
    ]
  }
};
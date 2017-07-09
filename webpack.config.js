const path = require("path");
const prod = process.env.NODE_ENV === 'prod';

module.exports = {
  watchOptions: {
    ignored: /node_modules/
  },
  entry: {
    "ymaps-touch-scroll": "./src/ymaps-touch-scroll.js"
  },
  output: {
    filename: prod ? "[name].min.js" : "[name].js",
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
const webpack = require("webpack");
const path = require("path");
const UnminifiedWebpackPlugin = require("unminified-webpack-plugin");

module.exports = {
  entry: "./src/ymaps-touch-scroll.js",
  output: {
    filename: "ymaps-touch-scroll.min.js",
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
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    }),
    new UnminifiedWebpackPlugin()
  ],
  externals: {
    ismobilejs: 'isMobile'
  }
};
const webpack = require("webpack");
const path = require("path");
const WebpackShellPlugin = require("webpack-shell-plugin");
const UnminifiedWebpackPlugin = require("unminified-webpack-plugin");

module.exports = {
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  entry: "./src/ymaps-touch-scroll.js",
  output: {
    filename: "ymaps-touch-scroll.bundle.min.js",
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
    new UnminifiedWebpackPlugin(),
    new WebpackShellPlugin({
      onBuildEnd: ["cp ./dist/ymaps-touch-scroll.bundle.min.js ./docs/"]
    })
  ]
};
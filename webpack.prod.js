const path = require("path");
const UnminifiedWebpackPlugin = require("unminified-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");

module.exports = {
  mode: "production",
  entry: "./src/ymaps-touch-scroll.js",
  output: {
    filename: "ymaps-touch-scroll.min.js",
    path: path.resolve(__dirname, "dist"),
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
  },
  plugins: [
    new UnminifiedWebpackPlugin(),
    new WebpackShellPlugin({
      onBuildEnd: ["cp ./dist/ymaps-touch-scroll.min.js ./docs/"]
    })
  ]
};
module.exports = {
  mode: "production",
  output: {
    filename: "ymaps-touch-scroll.js",
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

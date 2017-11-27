module.exports = function(env) {
  return require(`./webpack/webpack.${env}.js`)
};
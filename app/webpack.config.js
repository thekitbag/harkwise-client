const Dotenv = require('dotenv-webpack');

module.exports = (config) => {
  config.plugins.push(new Dotenv());

  return config;
};

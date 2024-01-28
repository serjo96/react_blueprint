const path = require("path");

module.exports = function override(config) {
  // Добавьте alias для src
  config.resolve.alias["~"] = path.resolve(__dirname, "src");

  return config;
};

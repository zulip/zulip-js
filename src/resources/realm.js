const api = require('../api');

function realm(config) {
  return {
    emoji: (params) => {
      const url = `${config.apiURL}/realm/emoji`;
      return api(url, config, 'GET', params);
    },
    filters: (params) => {
      const url = `${config.apiURL}/realm/filters`;
      return api(url, config, 'GET', params);
    },
  };
}

module.exports = realm;

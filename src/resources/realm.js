const api = require('../api');

function realm(config) {
  return {
    retrieve: (params) => {
      const url = `${config.apiURL}/realm/emoji`;
      return api(url, config, 'GET', params);
    },
  };
}

module.exports = realm;

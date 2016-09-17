const api = require('../api');

function emojis(config) {
  return {
    retrieve: (params) => {
      const url = `${config.apiURL}/realm/emoji`;
      return api(url, config, 'GET', params);
    },
  };
}

module.exports = emojis;

const api = require('../api');

function server(config) {
  return {
    settings: (params) => {
      const url = `${config.apiURL}/server_settings`;
      return api(url, config, 'GET', params);
    },
  };
}

module.exports = server;

const api = require('../api');

function streams(config) {
  return {
    retrieve: (params) => {
      const url = `${config.apiURL}/streams`;
      return api(url, config, 'GET', params);
    },
    subscriptions: {
      retrieve: (params) => {
        const url = `${config.apiURL}/users/me/subscriptions`;
        return api(url, config, 'GET', params);
      },
    },
  };
}

module.exports = streams;

const api = require('../api');

function streams(config) {
  return {
    retrieve: () => {
      const url = `${config.apiURL}/streams`;
      return api(url, config, 'GET');
    },
    subscriptions: {
      retrieve: () => {
        const url = `${config.apiURL}/users/me/subscriptions`;
        return api(url, config, 'GET');
      },
    },
  };
}

module.exports = streams;

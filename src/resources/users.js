const api = require('../api');

function users(config) {
  return {
    retrieve: (params) => {
      const url = `${config.apiURL}/users`;
      return api(url, config, 'GET', params);
    },
    me: {
      pointer: {
        retrieve: (params) => {
          const url = `${config.apiURL}/users/me/pointer`;
          return api(url, config, 'GET', params);
        },
      },
      subscriptions: {
        add: (params) => {
          const url = `${config.apiURL}/users/me/subscriptions`;
          return api(url, config, 'POST', params);
        },
      },
    },
  };
}

module.exports = users;

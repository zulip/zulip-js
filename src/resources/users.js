const api = require('../api');

function users(config) {
  return {
    retrieve: (params) => {
      const url = `${config.apiURL}/users`;
      return api(url, config, 'GET', params);
    },
  };
}

module.exports = users;

const api = require('../api');

function filters(config) {
  return {
    retrieve: (params) => {
      const url = `${config.apiURL}/realm/filters`;
      return api(url, config, 'GET', params);
    },
  };
}

module.exports = filters;

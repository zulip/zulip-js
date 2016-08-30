'use strict';
const api = require('../api');

module.exports = (config) => {
  return {
    retrieve: (params) => {
      const url = config.apiURL + '/messages';
      if (params.narrow) params.narrow = JSON.stringify(params.narrow);
      return api(url, config, 'GET', params);
    },
    send: (params) => {
      const url = config.apiURL + '/messages';
      return api(url, config, 'POST', params);
    }
  };
};

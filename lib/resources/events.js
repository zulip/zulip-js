'use strict';
const api = require('../api');

module.exports = (config) => {
  return {
    retrieve: (params) => {
      const url = config.apiURL + '/events';
      return api(url, config, 'GET', params);
    }
  };
};

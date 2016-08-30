'use strict';
const api = require('../api');

module.exports = (config) => {
  return {
    register: (params) => {
      if (params.event_types) params.event_types = JSON.stringify(params.event_types);
      const url = config.apiURL + '/register';
      return api(url, config, 'POST', params);
    }
  };
};

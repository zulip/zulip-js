const api = require('../api');

module.exports = (config) => {
  return {
    retrieve: (params) => {
      const url = config.apiURL + '/realm/emoji';
      return api(url, config, 'GET', params);
    }
  };
};

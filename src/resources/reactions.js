const api = require('../api');

function reactions(config) {
  const url = `${config.apiURL}/reactions`;
  const call = (method, params) => api(url, config, method, params);
  return {
    add: params => call('POST', params),
    remove: params => call('DELETE', params),
  };
}

module.exports = reactions;

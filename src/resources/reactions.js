const api = require('../api');

function reactions(config) {
  const url = messageID => `${config.apiURL}/messages/${messageID}/reactions`;
  const call = (method, initParams) => {
    const params = Object.assign({}, initParams);
    delete params.message_id;
    return api(url(initParams.message_id), config, method, params);
  };
  return {
    add: params => call('POST', params),
    remove: params => call('DELETE', params),
  };
}

module.exports = reactions;

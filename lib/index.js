const accounts = require('./resources/accounts');
const streams = require('./resources/streams');

module.exports = function(config) {
  config.apiURL = config.realm + '/api/v1';
  if (!config.apiKey) {
    return accounts(config).retrieve().then(res => {
      config.apiKey = res.api_key;
      return {
        config: config,
        accounts: accounts(config),
        streams: streams(config),
      };
    });
  } else {
    return {
      config: config,
      accounts: accounts(config),
      streams: streams(config),
    };
  }
};

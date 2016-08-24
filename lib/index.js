const accounts = require('./resources/accounts');

module.exports = function(config) {
  config.apiURL = config.realm + '/api/v1';
  return accounts(config).retrieve().then(res => {
    config.key = res.api_key;
    return {
      config: config,
      accounts: require('./resources/accounts')(config),
      streams: require('./resources/streams')(config),
    };
  });
};

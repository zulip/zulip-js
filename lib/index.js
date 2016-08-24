const accounts = require('./resources/accounts');

module.exports = function(config) {
  let obj = {accounts: {}};
  let apiURL = config.realm + '/api/v1';
  obj.accounts.retrieve = accounts.retrieve.bind(null, apiURL, config.username, config.password);
  return obj;
};

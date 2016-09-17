const accounts = require('./resources/accounts');
const streams = require('./resources/streams');
const messages = require('./resources/messages');
const queues = require('./resources/queues');
const events = require('./resources/events');
const users = require('./resources/users');
const emojis = require('./resources/emojis');

function resources(config) {
  return {
    config,
    accounts: accounts(config),
    streams: streams(config),
    messages: messages(config),
    queues: queues(config),
    events: events(config),
    users: users(config),
    emojis: emojis(config),
  };
}

function zulip(initialConfig) {
  const config = initialConfig;
  config.apiURL = `${config.realm}/api/v1`;
  if (!config.apiKey) {
    return accounts(config).retrieve().then((res) => {
      config.apiKey = res.api_key;
      return resources(config);
    });
  }
  return resources(config);
}

module.exports = zulip;

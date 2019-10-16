const path = require('path');
const zulip = require('../lib');

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

// Initialization with zuliprc
const zuliprc = path.resolve(__dirname, 'zuliprc');
zulip({ zuliprc }).then((z) => {
  // The zulip object now contains the API key
  console.log(z.config);
  return z.streams.subscriptions();
}).then(console.log)
  .catch((err) => console.log(err.message));

// Initialization with username & API key
zulip(config).then((z) => {
  // The zulip object now contains the API key
  console.log(z.config);
  return z.config.apiKey;
}).then((key) => {
  // Initialization with API key
  config.apiKey = key;
  return zulip(config).streams.subscriptions();
}).then(console.log)
  .catch((err) => console.log(err.message));

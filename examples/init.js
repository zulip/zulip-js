const path = require('path');
const zulip = require('../lib');

(async () => {
  // Initialization with zuliprc
  const zuliprc = path.resolve(__dirname, 'zuliprc');
  let z = await zulip({ zuliprc });
  // The zulip object now contains the API key
  console.log(z.config);
  console.log(await z.streams.subscriptions.retrieve());

  // Initialization with username & API key
  const config = {
    username: process.env.ZULIP_USERNAME,
    apiKey: process.env.ZULIP_API_KEY,
    realm: process.env.ZULIP_REALM,
  };
  z = await zulip(config);
  // The zulip object now contains the API key
  console.log(z.config);
  const key = z.config.apiKey;
  // Initialization with API key
  config.apiKey = key;
  z = await zulip(config);
  console.log(await z.streams.subscriptions.retrieve());
})();

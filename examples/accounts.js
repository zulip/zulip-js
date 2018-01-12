const zulip = require('../lib/');

zulip({
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
}).then(z => z.accounts.retrieve())
  .then(console.log);

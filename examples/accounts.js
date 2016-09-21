const zulip = require('../lib/');

zulip({
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM,
}).then(z => z.accounts.retrieve())
  .then(console.log);

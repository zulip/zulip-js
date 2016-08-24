let zulip = require('../lib/');

zulip = zulip({
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM
});

zulip.accounts.retrieve().then(res => {
  console.log(res);
});

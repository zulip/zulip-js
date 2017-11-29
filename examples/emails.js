const zulip = require('../lib/');

const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM,
};

zulip(config).then((z) => {
  z.emails.dev.retrieve().then(console.log);
}).catch(err => console.log(err.msg));

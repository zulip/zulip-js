const zulip = require('../lib');

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

zulip(config).then((z) => {
  z.filters.retrieve().then(console.log);
}).catch((err) => console.log(err.message));

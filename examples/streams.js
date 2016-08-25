const zulip = require('../lib/');
const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM
};

zulip(config).then(zulip => {
  // Fetch all streams
  return zulip.streams.retrieve()
    .then(console.log)
    .then(() => {
      // Fetch user's subscriptions
      return zulip.streams.subscriptions.retrieve();
    }).then(console.log);
}).catch(err => {
  console.log(err.msg);
});

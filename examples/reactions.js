const zulip = require('../lib/');

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

const params = {
  message_id: 1,
  emoji: 'smile',
};

zulip(config).then(z => z.reactions.add(params).then((resp) => {
  console.log(resp);
  return z.reactions.remove(params).then(console.log);
})).catch(err => console.log(err.msg));

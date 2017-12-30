const zulip = require('../lib/');

const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM,
};

const sendParams = {
  to: 'bot testing',
  type: 'stream',
  subject: 'Testing zulip-js',
  content: 'Something is horribly wrong....',
};

const z = zulip(config);

z.callEndpoint('/messages', 'POST', sendParams);

const zulip = require('../lib/');

const stream = 'test-bot';

const sendParams = {
  to: stream,
  type: 'stream',
  subject: 'Testing zulip-js',
  content: 'Something is wrong....',
};

const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM,
};

zulip(config).then((z) => {
  // Send a message
  z.messages.send(sendParams).then((res) => {
    // Response includes Message ID
    console.log(res);
    const readParams = {
      stream,
      type: 'stream',
      anchor: res.id,
      num_before: 1,
      num_after: 1,
    };
    // Fetch messages anchored around id (1 before, 1 after)
    return z.messages.retrieve(readParams);
  }).then(res => console.log(res.messages));
}).catch(err => console.log(err.message));

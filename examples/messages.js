'use strict';
let zulip = require('../lib/');

const stream = 'test-bot';
const params = {
  to: stream,
  type: 'stream',
  subject: 'Testing zulip-js',
  content: 'Something is wrong....'
};

const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM
};

zulip(config).then(zulip => {
  // Send a message
  zulip.messages.send(params).then(res => {
    // Response includes Message ID
    console.log(res);
    const params = {
      stream: stream,
      type: 'stream',
      anchor: res.id,
      num_before: 1,
      num_after: 1,
    };
    // Fetch messages anchored around id (1 before, 1 after)
    return zulip.messages.retrieve(params);
  }).then(res => {
    // List of messages
    console.log(res.messages);
  });
}).catch(err => {
  // Error
  console.log(err.message);
});

'use strict';
let zulip = require('../lib/');

const params = {
  to: process.env.ZULIP_TEST_USERNAME,
  type: 'private',
  subject: 'Testing zulip-js',
  content: 'Something is wrong....'
};

const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM
};

console.log(config);

zulip(config).then(zulip => {
  // Send a message
  zulip.messages.send(params).then(res => {
    // Response includes Message ID
    console.log(res);
    const params = {
      from: process.env.ZULIP_TEST_USERNAME,
      anchor: res.id,
      narrow: [{
        operator: 'is',
        operand: 'private'
      }],
      num_before: 1,
      num_after: 1,
    };
    // Fetch messages anchored around id (1 before, 1 after)
    return zulip.messages.retrieve(params);
  }).then(res => {
    console.log(res);
    // List of messages
    console.log(res.messages);
  });
}).catch(err => {
  // Error
  console.log(err.message);
});

'use strict';
const zulip = require('../lib/');
const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM
};

zulip(config).then(zulip => {
  // Register queue to receive messages for user
  const params = {
    event_types: ['message']
  };
  return zulip.queues.register(params).then(res => {
    console.log(res);
    // Prints 
    // { msg: '',
    //   max_message_id: 100375522,
    //   last_event_id: -1,
    //   result: 'success',
    //   queue_id: 'a queue id' }
  });
}).catch(err => {
  console.log(err.msg);
});

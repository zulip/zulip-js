const zulip = require('../lib');

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

(async () => {
  const z = await zulip(config);

  // Register queue to receive messages for user

  // Prints
  // { msg: '',
  //   max_message_id: 100375522,
  //   last_event_id: -1,
  //   result: 'success',
  //   queue_id: 'a queue id' }

  console.log(await z.queues.register({ event_types: ['message'] }));

  // Delete a previously registered queue

  // Prints
  // {
  //   msg: '',
  //   result: 'success',
  // }

  console.log(await z.queues.deregister({ queue_id: '1511901550:2' }));
})();

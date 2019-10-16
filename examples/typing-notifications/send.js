const zulip = require('../../lib/');

let recipient = process.env.ZULIP_USERNAME;
if (process.env.ZULIP_TYPING_RECIPIENT) {
  recipient = process.env.ZULIP_TYPING_RECIPIENT;
}

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

zulip(config).then((z) => {
  const params = {
    event_types: ['typing'],
  };
  // Register queue to receive typing notification events
  z.queues.register(params).then((res) => {
    console.log('registered queue');
    const queueID = res.queue_id;
    const typingParams = {
      to: recipient,
      op: 'start',
    };
    // Send typing started notification
    z.typing.send(typingParams).then(() => {
      console.log('sent typing params');
      // Retrieve typing events from a queue,
      // blocking until there is an event (or the request times out)
      const eventParams = {
        queue_id: queueID,
        last_event_id: -1,
        dont_block: false,
      };
      z.events.retrieve(eventParams).then(console.log);
      // Prints
    }).catch(console.log);
  });
}).catch((err) => console.log(err.message));

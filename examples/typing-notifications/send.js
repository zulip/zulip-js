const zulip = require('../../lib');

const recipient = Number(process.env.ZULIP_TYPING_RECIPIENT);

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

(async () => {
  const z = await zulip(config);

  // Register queue to receive typing notification events
  const res = await z.queues.register({
    event_types: ['typing'],
  });
  console.log('registered queue');
  const queueID = res.queue_id;

  // Send typing started notification
  await z.typing.send({
    to: [recipient],
    op: 'start',
  });
  console.log('sent typing params');

  // Retrieve typing events from a queue,
  // blocking until there is an event (or the request times out)
  console.log(
    await z.events.retrieve({
      queue_id: queueID,
      last_event_id: -1,
      dont_block: false,
    })
  );
})();

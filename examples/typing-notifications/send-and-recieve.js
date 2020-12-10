const zulip = require('../../lib');

if (process.argv.length < 7) {
  console.log(
    'Usage: $node examples/typing-notifications/send-and-recieve.js realm-url sender-username sender-API-key recipient-username recipient-API-key'
  );
  process.exit(1);
}

const [
  ,
  ,
  realm,
  sender,
  senderAPIKey,
  recipient,
  recipientAPIKey,
] = process.argv;

(async () => {
  const senderClient = await zulip({
    username: sender,
    apiKey: senderAPIKey,
    realm,
  });
  const recipientClient = await zulip({
    username: recipient,
    apiKey: recipientAPIKey,
    realm,
  });

  const { user_id: recipientId } = await recipientClient.users.me.getProfile();

  const res = await recipientClient.queues.register({
    event_types: ['typing'],
  });
  console.log(`Registered queue for ${recipient}`);
  const queueID = res.queue_id;

  console.log(
    await senderClient.typing.send({
      to: [recipientId],
      op: 'start',
    })
  );
  console.log(
    await recipientClient.events.retrieve({
      queue_id: queueID,
      last_event_id: -1,
    })
  );
})();

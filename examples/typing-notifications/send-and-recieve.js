const zulip = require('../../lib');

if (process.argv.length < 7) {
  console.log(
    'Usage: $node examples/typing-notifications/send-and-recieve.js realm-url sender-username sender-API-key recipient-username recipient-API-key'
  );
} else {
  const realm = process.argv[2];
  const sender = process.argv[3];
  const senderAPIKey = process.argv[4];
  const recipient = process.argv[5];
  const recipientAPIKey = process.argv[6];
  const senderClient = zulip({ username: sender, apiKey: senderAPIKey, realm });
  const recipientClient = zulip({
    username: recipient,
    apiKey: recipientAPIKey,
    realm,
  });

  recipientClient.queues
    .register({ event_types: ['typing'] })
    .then((res) => {
      console.log(`Registered queue for ${recipient}`);
      const queueID = res.queue_id;
      recipientClient.events
        .retrieve({
          queue_id: queueID,
          last_event_id: -1,
        })
        .then(console.log)
        .catch(console.log);
      senderClient.typing
        .send({
          to: recipient,
          op: 'start',
        })
        .then(console.log)
        .catch(console.log);
    })
    .catch(console.log);
}

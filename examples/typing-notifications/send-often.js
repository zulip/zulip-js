const zulip = require('../../lib/');

if (process.argv.length < 6) {
  console.log('Usage: $node examples/typing-notifications/send-often.js realm-url sender-username sender-API-key recipient-username');
} else {
  const realm = process.argv[2];
  const sender = process.argv[3];
  const senderAPIKey = process.argv[4];
  const recipient = process.argv[5];
  const senderClient = zulip({ username: sender, apiKey: senderAPIKey, realm });
  setInterval(() => {
    senderClient.typing.send({
      to: recipient,
      op: 'start',
    }).then(console.log).catch(console.log);
  }, 1500);
}

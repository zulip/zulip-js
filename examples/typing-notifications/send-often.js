const zulip = require('../../lib');

if (process.argv.length < 6) {
  console.log(
    'Usage: $node examples/typing-notifications/send-often.js realm-url sender-username sender-API-key recipient-user-ID'
  );
  process.exit(1);
}

const [, , realm, sender, senderAPIKey, recipient] = process.argv;

(async () => {
  const senderClient = await zulip({
    username: sender,
    apiKey: senderAPIKey,
    realm,
  });
  setInterval(async () => {
    await senderClient.typing.send({
      to: [Number(recipient)],
      op: 'start',
    });
  }, 1500);
})();

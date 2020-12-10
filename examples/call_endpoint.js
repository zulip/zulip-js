const zulip = require('../lib');

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

(async () => {
  const z = await zulip(config);

  console.log(
    await z.callEndpoint('/messages', 'POST', {
      to: 'bot testing',
      type: 'stream',
      subject: 'Testing zulip-js',
      content: 'Something is horribly wrong....',
    })
  );
})();

const zulip = require('../lib');

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

(async () => {
  const z = await zulip(config);

  // Fetch all streams
  console.log(await z.streams.retrieve());

  // Fetch user's subscriptions
  console.log(await z.streams.subscriptions.retrieve());

  // Get all the topics in the stream with ID 15
  console.log(await z.streams.topics.retrieve({ stream_id: 15 }));
})();

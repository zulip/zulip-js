const zulip = require('../lib/');

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

zulip(config).then((z) => {
  // Fetch all streams
  z.streams.retrieve()
  .then(console.log)
  // Fetch user's subscriptions
  .then(() => z.streams.subscriptions.retrieve())
  .then(console.log)
  // Get all the topics in the stream with ID 15
  .then(() => z.streams.topics.retrieve({ stream_id: 15 }))
  .then(console.log);
}).catch(err => console.log(err.msg));

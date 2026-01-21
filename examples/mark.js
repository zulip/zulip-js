const zulip = require('../lib');

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

(async () => {
  const z = await zulip(config);
  // Mark all messages as read
  console.log(await z.mark.all());

  // Mark all the unread messages in a stream as read
  const streamParams = {
    stream_id: 1,
  };
  console.log(await z.mark.stream(streamParams));
  // Mark all the unread messages in a topic as read
  const topicParams = {
    stream_id: 1,
    topic_name: 'Testing zulip-js',
  };
  console.log(await z.mark.topic(topicParams));
})();

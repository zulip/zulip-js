const zulip = require('../lib');

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

(async () => {
  const z = await zulip(config);
  // Send a message
  const res = z.messages.send({
    to: process.env.ZULIP_TEST_USERNAME,
    type: 'private',
    subject: 'Testing zulip-js',
    content: 'Something is wrong....',
  });
  // Response includes Message ID
  console.log(res);
  // Fetch messages anchored around id (1 before, 1 after)
  console.log(
    await z.messages.retrieve({
      from: process.env.ZULIP_TEST_USERNAME,
      anchor: res.id,
      narrow: [
        {
          operator: 'is',
          operand: 'private',
        },
      ],
      num_before: 1,
      num_after: 1,
    })
  );
  // Fetch the most recent message
  const mostRecentParams = {
    anchor: 1000000000,
    num_before: 1,
    num_after: 1,
    narrow: [
      {
        operator: 'is',
        operand: 'private',
      },
    ],
  };
  console.log(await z.messages.retrieve(mostRecentParams));
  // Fetch the pointer for the user
  const resp = await z.users.me.pointer.retrieve();
  // Fetch messages anchored around the last read message (1 before, 1 after)
  mostRecentParams.anchor = resp.pointer;
  console.log(await z.messages.retrieve(mostRecentParams));
})();

const zulip = require('../lib');

const sendParams = {
  to: process.env.ZULIP_TEST_USERNAME,
  type: 'private',
  subject: 'Testing zulip-js',
  content: 'Something is wrong....',
};

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

zulip(config)
  .then((z) => {
    // Send a message
    z.messages.send(sendParams).then((res) => {
      // Response includes Message ID
      console.log(res);
      const readParams = {
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
      };
      // Fetch messages anchored around id (1 before, 1 after)
      z.messages.retrieve(readParams).then(console.log);
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
      z.messages.retrieve(mostRecentParams).then(console.log);
      // Fetch the pointer for the user
      z.users.me.pointer.retrieve().then((resp) => {
        // Fetch messages anchored around the last read message (1 before, 1 after)
        mostRecentParams.anchor = resp.pointer;
        z.messages.retrieve(mostRecentParams).then(console.log);
      });
    });
  })
  .catch((err) => console.log(err.message));

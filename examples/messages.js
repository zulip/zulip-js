const zulip = require('../lib');

const stream = 'test-bot';

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

(async () => {
  const z = await zulip(config);
  // Send a message
  const res = await z.messages.send({
    to: stream,
    type: 'stream',
    subject: 'Testing zulip-js',
    content: 'Something is wrong....',
  });
  // Response includes Message ID
  console.log(res);

  // Update the message
  console.log(
    await z.messages.update({
      message_id: res.id,
      content: 'New content',
    })
  );

  const readParams = {
    stream,
    type: 'stream',
    anchor: res.id,
    num_before: 1,
    num_after: 1,
  };
  // Fetch messages anchored around id (1 before, 1 after)
  console.log(await z.messages.retrieve(readParams));
  // Fetch most recent message
  readParams.anchor = 1000000000;
  console.log(await z.messages.retrieve(readParams));
  // Get the id for the last message the user read
  const resp = await z.users.me.pointer.retrieve();
  // Fetch the messages around the last message that the user read
  readParams.anchor = resp.pointer;
  console.log(await z.messages.retrieve(readParams));
  // Add a flag for the message that was sent
  const flagParams = {
    messages: [res.id],
    flag: 'read',
  };
  console.log(await z.messages.flags.add(flagParams));
  // Remove the flag for the message that was sent
  console.log(await z.messages.flags.remove(flagParams));

  console.log(await z.messages.getById({ message_id: 1 }));
  console.log(await z.messages.getHistoryById({ message_id: 2 }));
  console.log(await z.messages.deleteReactionById({ message_id: 1 }));
  console.log(await z.messages.deleteById({ message_id: 1 }));
})();

const zulip = require('../lib');

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

(async () => {
  const z = await zulip(config);
  // Retrieve events from a queue, blocking until there is an event (or the request timesout)
  console.log(
    await z.events.retrieve({
      queue_id: process.env.ZULIP_QUEUE_ID,
      last_event_id: -1,
      dont_block: false,
    })
  );
  // Prints
  // { msg: '',
  //   result: 'success',
  //   handler_id: 2005928,
  //   events:
  //     [ { flags: [Object], message: [Object], type: 'message', id: 0 },
  //       { type: 'heartbeat', id: 1 },
  //       { flags: [], message: [Object], type: 'message', id: 2 },
  //       { flags: [], message: [Object], type: 'message', id: 3 },
  //       { flags: [], message: [Object], type: 'message', id: 4 } ] }
})();

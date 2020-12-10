const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

const zulip = require('../lib');

(async () => {
  const z = await zulip(config);

  // Prints
  //   { msg: '',
  //     subscribed: { 'aero31aero@gmail.com': [ 'off topic' ] },
  //     already_subscribed: {},
  //     result: 'success' }

  console.log(
    await z.users.me.subscriptions.add({
      subscriptions: JSON.stringify([{ name: 'off topic' }]),
    })
  );
})();

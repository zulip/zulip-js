const zulip = require('../lib');

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

(async () => {
  const z = await zulip({
    username: process.env.ZULIP_USERNAME,
    password: process.env.ZULIP_PASSWORD,
    realm: process.env.ZULIP_REALM,
  });
  console.log(await z.accounts.retrieve());
})();

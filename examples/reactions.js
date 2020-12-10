const zulip = require('../lib');

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

(async () => {
  const z = await zulip(config);

  const params = {
    message_id: 1,
    emoji_name: 'musical_note',
    emoji_code: '1f3b5',
    reaction_type: 'unicode_emoji',
  };

  console.log(await z.reactions.add(params));
  console.log(await z.reactions.remove(params));
})();

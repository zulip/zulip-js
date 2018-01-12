const zulip = require('../lib/');

const config = {
  username: process.env.ZULIP_USERNAME,
  apikey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

zulip(config)
  .then((z) => {
    // Get list of users
    //  Prints
    //  { msg: '',
    //    result: 'success',
    //    members:
    //    [ { is_bot: false,
    //        is_active: true,
    //        avatar_url: 'https://secure.gravatar.com/avatar/sfgsgsfsfh84785346gsfgsgf?d=identicon',
    //        is_admin: false,
    //        full_name: 'John Doe',
    //        email: 'john.doe@exmaple.com' },
    //   ...
    z.users.retrieve().then(console.log);

    // Create a new user
    const createParams = {
      email: 'newbie@zulip.com',
      password: 'temp',
      full_name: 'New User',
      short_name: 'newbie',
    };
    z.users.create(createParams).then(console.log);

    // Unsubscribe from the stream Verona
    const removeParams = {
      subscriptions: JSON.stringify(['Verona']),
    };
    z.users.me.subscriptions.remove(removeParams).then(console.log);

    // Get pointer for user
    // Prints
    // { msg: '', pointer: 3432741029383298, result: 'success' }
    z.users.me.pointer.retrieve().then(console.log);
  })
  .catch(err => console.log(err.msg));

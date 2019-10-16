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

    // Get user profile
    //  Prints
    //  { is_bot: false,
    //    pointer: -1,
    //    max_message_id: 141,
    //    user_id: 22,
    //    is_admin: false,
    //    short_name: 'aaron',
    //    client_id: 'f495a00ce0546e7b77d86222b0ac5f81',
    //    full_name: 'aaron',
    //    result: 'success',
    //    msg: '',
    //    email: 'AARON@zulip.com' }
    z.users.me.getProfile().then(console.log);

    // Unsubscribe from the stream Verona
    const removeParams = {
      subscriptions: JSON.stringify(['Verona']),
    };
    z.users.me.subscriptions.remove(removeParams).then(console.log);

    // Get pointer for user
    z.users.me.pointer.retrieve().then((resp) => {
      // Prints
      // { msg: '', pointer: 3432741029383298, result: 'success' }
      console.log(resp);
      // Update pointer for user (has the side effect of marking some messages as read)
      // Prints success if the message id is valid
      z.users.me.pointer.update(resp.pointer + 1).then(console.log);
    });
  })
  .catch((err) => console.log(err.msg));

zulip(config).then((z) => {
  z.users.me.alertWords.retrieve().then(console.log);
}).catch((err) => console.log(err.msg));

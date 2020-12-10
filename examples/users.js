const zulip = require('../lib');

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

(async () => {
  const z = await zulip(config);

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
  console.log(await z.users.retrieve());

  // Create a new user
  console.log(
    await z.users.create({
      email: 'newbie@zulip.com',
      password: 'temp',
      full_name: 'New User',
      short_name: 'newbie',
    })
  );

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
  console.log(await z.users.me.getProfile());

  // Unsubscribe from the stream Verona
  console.log(
    await z.users.me.subscriptions.remove({
      subscriptions: JSON.stringify(['Verona']),
    })
  );

  // Get pointer for user
  const resp = await z.users.me.pointer.retrieve();
  // Prints
  // { msg: '', pointer: 3432741029383298, result: 'success' }
  console.log(resp);
  // Update pointer for user (has the side effect of marking some messages as read)
  // Prints success if the message id is valid
  console.log(await z.users.me.pointer.update(resp.pointer + 1));

  console.log(await z.users.me.alertWords.retrieve());
})();

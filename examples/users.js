const zulip = require('../lib/');

const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM,
};

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

zulip(config)
  .then(z => z.users.retrieve())
  .then(console.log)
  .catch(err => console.log(err.msg));

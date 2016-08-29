'use strict';
const zulip = require('../lib/');
const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM
};

zulip(config).then(zulip => {
  // Get list of users 
  return zulip.users.retrieve({}).then(res => {
    console.log(res);
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
  });
}).catch(err => {
  console.log(err.msg);
});

'use strict';
const zulip = require('../lib/');
const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM
};

zulip(config).then(zulip => {
  // Get list of realm emojis
  return zulip.emojis.retrieve().then(res => {
    console.log(res);
    //  Prints
    // { msg: '',
    //   result: 'success',
    //     emoji: {
    //       doge: {
    //         source_url: 'http://web.mit.edu/jesstess/www/doge.png',
    //         display_url: 'https://uploads.zulipusercontent.net/edc1569f7cb021b4877bc800019bef0960ed5b03/687474703a2f2f7765622e6d69742e6564752f6a657373746573732f7777772f646f67652e706e67'
    //       },
    //   ...
  });
}).catch(err => {
  console.log(err.msg);
});

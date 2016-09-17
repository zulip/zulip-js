const assert = require('assert');
const emojis = require('../../lib/resources/emojis');

const realm = process.env.ZULIP_REALM;
const apiURL = `${realm}/api/v1`;
const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  apiURL,
};

console.log('Testing fetching emojis');

emojis(config).retrieve({})
  .then((resp) => {
    console.log(resp);
    assert(resp.result === 'success', resp.msg);
    console.log('Test passed!');
  }).catch((err) => {
    console.log('Test failed:', err.message);
  });

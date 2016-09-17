const assert = require('assert');
const accounts = require('../../lib/resources/accounts');

const realm = process.env.ZULIP_REALM;
const apiURL = `${realm}/api/v1`;

const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  apiURL,
};

console.log('Testing fetch API Key');

accounts(config).retrieve()
  .then((resp) => {
    assert(resp.result === 'success', resp.msg);
    console.log('Test passed');
  }).catch((err) => {
    console.log('Test failed: ', err.message);
  });

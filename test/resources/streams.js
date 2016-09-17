const assert = require('assert');
const streams = require('../../lib/resources/streams');

const realm = process.env.ZULIP_REALM;
const apiURL = `${realm}/api/v1`;
const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  apiURL,
};

console.log('Testing fetch all streams');
streams(config)
  .retrieve()
  .then((resp) => {
    assert(resp.result === 'success', resp.msg);
    console.log('Test passed');
  })
  .then(() => {
    console.log('Testing fetch subscriptions');
    return streams(config).subscriptions.retrieve();
  })
  .then((resp) => {
    assert(resp.result === 'success', resp.msg);
    console.log('Test passed');
  })
  .catch((err) => {
    console.log(`Test failed: ${err.message}`);
  });

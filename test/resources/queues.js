const assert = require('assert');
const queues = require('../../lib/resources/queues');

const realm = process.env.ZULIP_REALM;
const apiURL = `${realm}/api/v1`;
const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  apiURL,
};

console.log('Testing register queue');
const params = {
  event_types: ['message'],
};

queues(config)
  .register(params)
  .then((resp) => {
    assert(resp.result === 'success', resp.msg);
    console.log(resp);
    console.log('Test passed');
  })
  .catch((err) => {
    console.log(`Test failed: ${err.message}`);
  });

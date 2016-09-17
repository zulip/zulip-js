const assert = require('assert');
const messages = require('../../lib/resources/messages');

const realm = process.env.ZULIP_REALM;
const apiURL = `${realm}/api/v1`;
const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  apiURL,
};
const stream = process.env.ZULIP_TEST_STREAM;

console.log('Testing send message to stream:', stream);
const params = {
  to: stream,
  type: 'stream',
  subject: 'Testing zulip-js',
  content: 'Something is wrong....',
};

messages(config).send(params)
  .then((resp) => {
    assert(resp.result === 'success', resp.msg);
    console.log(resp);
    console.log('Test passed');
    return resp.id;
  })
  .then((id) => {
    console.log('Testing fetch messages for stream ', stream);
    const retrieveParams = {
      stream,
      type: 'stream',
      anchor: id,
      num_before: 1,
      num_after: 1,
    };
    return messages(config).retrieve(retrieveParams);
  })
  .then((resp) => {
    console.log(resp);
    assert(resp.result === 'success', resp.msg);
    console.log('Test passed');
  })
  .catch((err) => {
    console.log('Test failed: ', err.message);
  });

'use strict';
const assert = require('assert');
const streams = require('../../lib/resources/streams.js');

const realm = process.env.ZULIP_REALM;
const apiURL = realm + '/api/v1';
const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  apiURL: apiURL
};

console.log("Testing fetch subscriptions");

streams(config).subscriptions().then((resp) => {
  assert(resp.result === 'success', resp.msg);
  console.log("Test passed");
}).catch(err => {
  console.log("Test failed: " + err.message);
});

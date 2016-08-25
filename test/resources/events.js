'use strict';
const assert = require('assert');
const events = require('../../lib/resources/events.js');

const realm = process.env.ZULIP_REALM;
const apiURL = realm + '/api/v1';
const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  apiURL: apiURL
};

console.log("Testing retrieve events from a queue");
const params = {
  queue_id: process.env.ZULIP_QUEUE_ID,
  last_event_id: -1,
  dont_block: true
};

events(config).retrieve(params).then((resp) => {
  assert(resp.result === 'success', resp.msg);
  console.log(resp);
  console.log("Test passed");
}).catch(err => {
  console.log("Test failed: " + err.message);
});

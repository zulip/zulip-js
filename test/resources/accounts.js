'use strict';
const assert = require('assert');
const account = require('../../lib/resources/accounts.js');

const username = process.env.ZULIP_USERNAME;
const password = process.env.ZULIP_PASSWORD;
const realm = process.env.ZULIP_REALM;
const apiURL = realm + '/api/v1';

console.log("Testing fetch API Key");

account.retrieve(apiURL, username, password).then((resp) => {
  assert(resp.result === 'success', resp.msg);
  console.log("Test passed");
}).catch(err => {
  console.log("Test failed: " + err.message);
});

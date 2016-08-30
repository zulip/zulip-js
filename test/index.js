'use strict';
const assert = require('assert');
const lib = require('..');

const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM
};

console.log("Testing initialization");
console.log("With username & password");

lib(config).then(zulip => {
  assert(zulip.config.apiKey, "Could not initialize API Key");
  console.log("Test passed");
  return zulip.config;
}).then(config => {
  console.log("With API Key");
  return lib(config);
}).then(zulip => zulip.streams.subscriptions.retrieve()).then(resp => {
    assert(resp.result === 'success', resp.msg);
    console.log("Test passed");
}).catch(err => {
  console.log("Test failed: " + err.message);
});

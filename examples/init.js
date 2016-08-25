'use strict';
const assert = require('assert');
const zulip = require('../lib');

const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM
};

// Initialization with username & password
zulip(config).then(zulip => {
  // The zulip object now contains the API key
  console.log(zulip.config)
  return zulip.config;
}).then(config => {
  // Initialization with API key
  const zulip = require('../lib')(config);
  return zulip.streams.subscriptions();
}).then(resp => {
  // Response
  console.log(resp);
}).catch(err => {
  // Error
  console.log("Error: " + err.message);
});

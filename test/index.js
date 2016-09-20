const assert = require('assert');
const lib = require('..');
const chai = require('chai');
chai.use(require('chai-as-promised'));

const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM,
};

console.log('Testing initialization');
console.log('With username & password');

chai.should();
describe('Initialization', () => {
  it('Should get API key', () => {
    lib(config).should.eventually.have.deep.property('config.apiKey');
  });
});

lib(config)
  .then((zulip) => {
    assert(zulip.config.apiKey, 'Could not initialize API Key');
    console.log('Test passed');
    return zulip.config;
  })
  .then((newConfig) => {
    console.log('With API Key');
    return lib(newConfig);
  })
  .then(zulip => zulip.streams.subscriptions.retrieve())
  .then((resp) => {
    assert(resp.result === 'success', resp.msg);
    console.log('Test passed');
  })
  .catch((err) => {
    console.log('Test failed:', err.message);
  });

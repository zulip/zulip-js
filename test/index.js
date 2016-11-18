const lib = require('..');
const chai = require('chai');
const path = require('path');
chai.use(require('chai-as-promised'));

const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM,
};

chai.should();
describe('Initialization', () => {
  describe('With zuliprc', () => {
    it('Should read API key from zuliprc', () => {
      const zuliprc = path.resolve(__dirname, 'zuliprc');
      lib({ zuliprc }).should.eventually.have.deep.property('config.apiKey');
    });
  });

  describe('With username & password', () => {
    it('Should get API key', () => {
      lib(config).should.eventually.have.deep.property('config.apiKey');
    });
  });

  describe('With API Key', () => {
    it('Should get 200 on API request', () => {
      config.apiKey = process.env.ZULIP_API_KEY;
      lib(config).streams.subscriptions.retrieve()
        .should.eventually.have.property('status', 200);
    });
  });
});

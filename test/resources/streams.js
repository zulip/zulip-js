const streams = require('../../lib/resources/streams');
const chai = require('chai');
chai.use(require('chai-as-promised'));

const realm = process.env.ZULIP_REALM;
const apiURL = `${realm}/api/v1`;

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  apiURL,
};

chai.should();
describe('Streams', () => {
  it('Should fetch streams', () => {
    streams(config).retrieve().should.eventually.have.property('result', 'success');
  });
  it('Should fetch subscriptions', () => {
    streams(config).subscriptions.retrieve().should.eventually.have.property('result', 'success');
  });
});

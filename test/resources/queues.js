const queues = require('../../lib/resources/queues');
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
describe('Queues', () => {
  it('Should register queue', () => {
    const params = {
      event_types: ['message'],
    };
    queues(config).register(params).should.eventually.have.property('result', 'success');
  });
});

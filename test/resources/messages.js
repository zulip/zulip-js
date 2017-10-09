const messages = require('../../lib/resources/messages');
const chai = require('chai');

chai.use(require('chai-as-promised'));

const realm = process.env.ZULIP_REALM;
const stream = process.env.ZULIP_TEST_STREAM;
const apiURL = `${realm}/api/v1`;

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  apiURL,
};

chai.should();
describe('Messages', () => {
  it('Should send message to test stream', () => {
    const params = {
      to: stream,
      type: 'stream',
      subject: 'Testing zulip-js',
      content: 'Something is wrong....',
    };
    messages(config).send(params).should.eventually.have.property('result', 'success');
  });

  it('Should fetch messages from test stream', () => {
    const params = {
      stream,
      type: 'stream',
      anchor: 100000000,
      num_before: 1,
      num_after: 1,
    };
    messages(config).retrieve(params).should.eventually.have.property('result', 'success');
  });

  it('Should mark message as read', () => {
    const params = {
      flag: 'read',
      messages: [0],
    };
    messages(config).flags.add(params)
      .should.eventually.have.property('result', 'success');
  });

  it('Should mark message as unread', () => {
    const params = {
      flag: 'read',
      messages: [0],
    };
    messages(config).flags.remove(params)
      .should.eventually.have.property('result', 'success');
  });
});

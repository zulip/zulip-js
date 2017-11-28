const messages = require('../../lib/resources/messages');
const common = require('../common');
const chai = require('chai');
chai.use(require('chai-as-promised'));

const assert = chai.assert;
chai.should();

const config = {
  username: 'valid@email.com',
  apiKey: 'randomcharactersonlyq32YIpC8aMSH',
  apiURL: 'valid.realm.url/api/v1',
};

describe('Messages', () => {
  it('should send message to test stream', () => {
    const params = {
      to: 'test stream',
      type: 'stream',
      subject: 'Testing zulip-js',
      content: 'Something is wrong....',
    };
    const validator = (url, options) => {
      assert.equal(url, `${config.apiURL}/messages`);
      assert.equal(Object.keys(options.body.data).length, 4);
      assert.equal(options.body.data.to, params.to);
      assert.equal(options.body.data.type, params.type);
      assert.equal(options.body.data.subject, params.subject);
      assert.equal(options.body.data.content, params.content);
    };
    const output = {
      result: 'success',
      msg: '',
      id: 168,
    };
    const stubs = common.getStubs(validator, output);
    messages(config).send(params).should.eventually.have.property('result', 'success');
    common.restoreStubs(stubs);
  });

  it('should fetch messages from test stream', () => {
    const params = {
      stream: 'test stream',
      type: 'stream',
      anchor: 100000000,
      num_before: 1,
      num_after: 1,
    };
    const validator = (url, options) => {
      url.should.contain(`${config.apiURL}/messages`);
      options.should.not.have.property('body');
      const urldata = url.split('?', 2)[1].split('&'); // URL: host/messages?key=value&key=value...
      urldata.length.should.equal(5);
      urldata.should.contain(`stream=${params.stream}`);
      urldata.should.contain(`type=${params.type}`);
      urldata.should.contain(`anchor=${params.anchor}`);
      urldata.should.contain(`num_before=${params.num_before}`);
      urldata.should.contain(`num_after=${params.num_after}`);
    };
    const output = {
      result: 'success',
      msg: '',
      messages: [], // TODO expand test with actual API message data.
    };
    const stubs = common.getStubs(validator, output);
    messages(config).retrieve(params).should.eventually.have.property('result', 'success');
    common.restoreStubs(stubs);
  });
});

const messages = require('../../lib/resources/messages');
const common = require('../common');
const chai = require('chai');
chai.use(require('chai-as-promised'));

chai.should();

describe('Messages', () => {
  it('should send message to test stream', () => {
    const params = {
      to: 'test stream',
      type: 'stream',
      subject: 'Testing zulip-js',
      content: 'Something is wrong....',
    };
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/messages`);
      Object.keys(options.body.data).length.should.equal(4);
      options.body.data.to.should.equal(params.to);
      options.body.data.type.should.equal(params.type);
      options.body.data.subject.should.equal(params.subject);
      options.body.data.content.should.equal(params.content);
    };
    const output = {
      result: 'success',
      msg: '',
      id: 168,
    };
    const stubs = common.getStubs(validator, output);
    messages(common.config).send(params).should.eventually.have.property('result', 'success');
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
      url.should.contain(`${common.config.apiURL}/messages`);
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
    messages(common.config).retrieve(params).should.eventually.have.property('result', 'success');
    common.restoreStubs(stubs);
  });

  it('should render messages', () => {
    const params = {
      content: 'Hello **world**',
    };
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/messages/render`);
      Object.keys(options.body.data).length.should.equal(1);
      options.body.data.content.should.equal(params.content);
    };
    const output = {
      result: 'success',
      msg: '',
      rendered: '<p>Hello <strong>world</strong></p>',
    };
    const stubs = common.getStubs(validator, output);
    messages(common.config).render(params).should.eventually.have.property('result', 'success');
    messages(common.config).render(params.content).should.eventually.have.property('result', 'success');
    common.restoreStubs(stubs);
  });
});

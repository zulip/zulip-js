const messages = require('../../lib/resources/messages');
const common = require('../common');
const chai = require('chai');
chai.use(require('chai-as-promised'));

chai.should();

describe('Messages', () => {
  it('should send message to test stream', (done) => {
    const params = {
      to: 'test stream',
      type: 'stream',
      subject: 'Testing zulip-js',
      content: 'Something is wrong....',
    };
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/messages`);
      options.method.should.be.equal('POST');
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
    messages(common.config).send(params)
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      }).catch(done);
  });

  it('should fetch messages from test stream', (done) => {
    const params = {
      stream: 'test stream',
      type: 'stream',
      anchor: 100000000,
      num_before: 1,
      num_after: 1,
    };
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/messages`);
      options.method.should.be.equal('GET');
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
    messages(common.config).retrieve(params)
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      }).catch(done);
  });

  it('should render messages', (done) => {
    const params = {
      content: 'Hello **world**',
    };
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/messages/render`);
      options.method.should.be.equal('POST');
      Object.keys(options.body.data).length.should.equal(1);
      options.body.data.content.should.equal(params.content);
    };
    const output = {
      result: 'success',
      msg: '',
      rendered: '<p>Hello <strong>world</strong></p>',
    };
    const stubs = common.getStubs(validator, output);
    messages(common.config).render(params)
      .then((data) => {
        data.should.have.property('result', 'success');
        return messages(common.config).render(params.content);
      }).then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      })
      .catch(done);
  });

  it('should update message', (done) => {
    const params = {
      message_id: 131,
      content: 'New content',
    };
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/messages/131`);
      options.should.not.have.property('body');
      options.method.should.be.equal('PATCH');
    };
    const output = {
      msg: '',
      result: 'success',
    };
    const stubs = common.getStubs(validator, output);
    messages(common.config).update(params)
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      }).catch(done);
  });

  it('should get message by id', (done) => {
    const params = {
      message_id: 1,
    };
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/messages/1`);
      options.should.not.have.property('body');
      options.method.should.be.equal('GET');
    };
    const output = {
      msg: '',
      result: 'success',
    };
    const stubs = common.getStubs(validator, output);
    messages(common.config).getById(params)
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      }).catch(done);
  });

  it('should get message history by id', (done) => {
    const params = {
      message_id: 2,
    };
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/messages/2/history`);
      options.should.not.have.property('body');
      options.method.should.be.equal('GET');
    };
    const output = {
      msg: '',
      result: 'success',
    };
    const stubs = common.getStubs(validator, output);
    messages(common.config).getHistoryById(params)
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      }).catch(done);
  });

  it('should mark message as read', (done) => {
    const params = {
      flag: 'read',
      messages: [131],
    };


    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/messages/flags`);
      options.method.should.be.equal('POST');
      Object.keys(options.body.data).length.should.equal(3);
      options.body.data.flag.should.equal(params.flag);
      options.body.data.op.should.equal('add');
      const messageList = JSON.parse(options.body.data.messages);
      messageList.should.deep.equal(params.messages);
    };
    const output = {
      msg: '',
      result: 'success',
    };
    const stubs = common.getStubs(validator, output);
    messages(common.config).flags.add(params)
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      }).catch(done);
  });

  it('should mark message as unread', (done) => {
    const params = {
      flag: 'read',
      messages: [131],
    };
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/messages/flags`);
      options.method.should.be.equal('POST');
      Object.keys(options.body.data).length.should.equal(3);
      options.body.data.flag.should.equal(params.flag);
      options.body.data.op.should.equal('remove');
      const messageList = JSON.parse(options.body.data.messages);
      messageList.should.deep.equal(params.messages);
    };
    const output = {
      msg: '',
      result: 'success',
    };
    const stubs = common.getStubs(validator, output);
    messages(common.config).flags.remove(params)
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      }).catch(done);
  });
});

const typing = require('../../lib/resources/typing');
const common = require('../common');
const chai = require('chai');
chai.use(require('chai-as-promised'));

chai.should();

describe('Typing', () => {
  it('Should send typing started notification', (done) => {
    const params = {
      to: 'othello@zulip.com',
      op: 'start',
    };
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/typing`);
      options.method.should.be.equal('POST');
      Object.keys(options.body.data).length.should.equal(2);
      options.body.data.op.should.equal(params.op);
      // The email comes JSON-encoded (i.e. enclosed in double quotes)
      JSON.parse(options.body.data.to).should.equal(params.to);
    };
    const output = {
      events: [{
        id: 0,
        type: 'typing',
        op: 'start',
        sender: {}, // TODO expand test with actual data
        recipients: {},
      }],
      result: 'success',
      msg: '',
      handler_id: 225,
    };
    const stubs = common.getStubs(validator, output);
    typing(common.config).send(params)
    .then((data) => {
      data.should.have.property('result', 'success');
      common.restoreStubs(stubs);
      done();
    }).catch(done);
  });

  it('Should send typing stopped notification', (done) => {
    const params = {
      to: 'othello@zulip.com',
      op: 'stop',
    };
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/typing`);
      options.method.should.be.equal('POST');
      Object.keys(options.body.data).length.should.equal(2);
      options.body.data.op.should.equal(params.op);
      // The email comes JSON-encoded (i.e. enclosed in double quotes)
      JSON.parse(options.body.data.to).should.equal(params.to);
    };
    const output = {
      events: [{
        id: 0,
        type: 'typing',
        op: 'stop',
        sender: {},
        recipients: {},
      }],
      result: 'success',
      msg: '',
      handler_id: 286,
    };
    const stubs = common.getStubs(validator, output);
    typing(common.config).send(params)
    .then((data) => {
      data.should.have.property('result', 'success');
      common.restoreStubs(stubs);
      done();
    }).catch(done);
  });
});

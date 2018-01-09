const queues = require('../../lib/resources/queues');
const common = require('../common');
const chai = require('chai');
chai.use(require('chai-as-promised'));

chai.should();

describe('Queues', () => {
  it('should register queue', () => {
    const params = {
      event_types: ['message'],
    };
    const output = {
      max_message_id: 173,
      msg: '',
      result: 'success',
      queue_id: '1511901550:2',
      last_event_id: -1,
    };
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/register`);
      options.should.have.property('body');
      Object.keys(options.body.data).length.should.be.equal(1);
      options.body.data.event_types.should.be.equal('["message"]');
    };
    const stubs = common.getStubs(validator, output);
    queues(common.config).register(params).should.eventually.have.property('result', 'success');
    common.restoreStubs(stubs);
  });

  it('should deregister queue', () => {
    const params = {
      queue_id: '1511901550:2',
    };
    const output = {
      msg: '',
      result: 'success',
    };
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/events`);
      options.should.not.have.property('body');
    };
    const stubs = common.getStubs(validator, output);
    queues(common.config).deregister(params).should.eventually.have.property('result', 'success');
    common.restoreStubs(stubs);
  });
});

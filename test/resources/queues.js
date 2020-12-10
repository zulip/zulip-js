const chai = require('chai');
const queues = require('../../lib/resources/queues');
const common = require('../common');

chai.should();

describe('Queues', () => {
  it('should register queue', async () => {
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
      options.method.should.be.equal('POST');
      options.should.have.property('body');
      Object.keys(options.body.data).length.should.be.equal(1);
      options.body.data.event_types.should.be.equal('["message"]');
    };
    common.stubNetwork(validator, output);
    const data = await queues(common.config).register(params);
    data.should.have.property('result', 'success');
  });

  it('should deregister queue', async () => {
    const params = {
      queue_id: '1511901550:2',
    };
    const output = {
      msg: '',
      result: 'success',
    };
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/events`);
      options.method.should.be.equal('DELETE');
      options.should.not.have.property('body');
    };
    common.stubNetwork(validator, output);
    const data = await queues(common.config).deregister(params);
    data.should.have.property('result', 'success');
  });
});

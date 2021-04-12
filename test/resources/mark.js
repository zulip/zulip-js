const chai = require('chai');
const mark = require('../../lib/resources/mark');
const common = require('../common');

chai.should();

describe('Mark', () => {
  it('should mark all messages as read', async () => {
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/mark_all_as_read`);
      Object.keys(options.body.data).length.should.equal(0);
      options.method.should.be.equal('POST');
    };
    const output = {
      msg: '',
      result: 'success',
    };
    common.stubNetwork(validator, output);
    const data = await mark(common.config).all();
    data.should.have.property('result', 'success');
  });

  it('should mark all messages in a stream as read', async () => {
    const paramsStream = {
      stream_id: 15,
    };
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/mark_stream_as_read`);
      Object.keys(options.body.data).length.should.equal(1);
      options.method.should.be.equal('POST');
    };
    const outputStream = {
      msg: '',
      result: 'success',
    };
    common.stubNetwork(validator, outputStream);
    const dataStream = await mark(common.config).stream(paramsStream);
    dataStream.should.have.property('result', 'success');
  });

  it('should mark all messages in a topic as read', async () => {
    const paramsTopic = {
      stream_id: 15,
      topic_name: 'Denmark1',
    };
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/mark_topic_as_read`);
      Object.keys(options.body.data).length.should.equal(2);
      options.method.should.be.equal('POST');
    };
    const outputTopic = {
      msg: '',
      result: 'success',
    };
    common.stubNetwork(validator, outputTopic);
    const dataTopic = await mark(common.config).topic(paramsTopic);
    dataTopic.should.have.property('result', 'success');
  });
});

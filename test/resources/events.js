const chai = require('chai');
const events = require('../../lib/resources/events');
const common = require('../common');

chai.should();

describe('Events', () => {
  it('should fetch events', async () => {
    const params = {
      last_event_id: -1,
      dont_block: true,
    };
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/events`);
      options.method.should.be.equal('GET');
      options.should.not.have.property('body');
      [...new URL(url).searchParams].should.have.deep.members([
        ['last_event_id', `${params.last_event_id}`],
        ['dont_block', `${params.dont_block}`],
      ]);
    };
    const output = {
      events: [
        {
          id: 0,
          message: [Object],
          type: 'message',
          flags: [Object],
        },
      ],
      result: 'success',
      msg: '',
      queue_id: '1511901550:3',
    };
    common.stubNetwork(validator, output);
    const data = await events(common.config).retrieve(params);
    data.should.have.property('result', 'success');
  });
});

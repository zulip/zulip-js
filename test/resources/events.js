const events = require('../../lib/resources/events');
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

const params = {
  last_event_id: -1,
  dont_block: true,
};

chai.should();

describe('Events', () => {
  before(() => queues(config).register({ event_types: ['message'] }).then((res) => {
    params.queue_id = res.queue_id;
  }));

  it('Should fetch events', () => {
    events(config).retrieve(params).should.eventually.have.property('result', 'success');
  });
});

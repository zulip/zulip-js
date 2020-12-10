const chai = require('chai');
const streams = require('../../lib/resources/streams');
const common = require('../common');

chai.should();

describe('Streams', () => {
  it('should fetch streams', async () => {
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/streams`);
      options.method.should.be.equal('GET');
      options.should.not.have.property('body');
    };
    const output = {
      result: 'success',
      msg: '',
      streams: [
        {
          name: 'Denmark',
          stream_id: 1,
          invite_only: false,
          description: 'A Scandinavian country',
        },
        {
          name: 'Rome',
          stream_id: 2,
          invite_only: false,
          description: 'Yet another Italian city',
        },
        {
          name: 'Scotland',
          stream_id: 3,
          invite_only: false,
          description: 'Located in the United Kingdom',
        },
        {
          name: 'Venice',
          stream_id: 4,
          invite_only: false,
          description: 'A northeastern Italian city',
        },
        {
          name: 'Verona',
          stream_id: 5,
          invite_only: false,
          description: 'A city in Italy',
        },
      ],
    };
    common.stubNetwork(validator, output);
    const data = await streams(common.config).retrieve();
    data.should.have.property('result', 'success');
  });

  it('should fetch subscriptions', async () => {
    const params = {
      subscriptions: JSON.stringify([{ name: 'off topic' }]),
    };
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/users/me/subscriptions`);
      options.method.should.be.equal('GET');
      options.should.not.have.property('body');
      [...new URL(url).searchParams].should.have.deep.members([
        ['subscriptions', params.subscriptions],
      ]);
    };
    const output = {
      msg: '',
      result: 'success',
      subscriptions: [
        {
          color: '#e79ab5',
          invite_only: false,
          desktop_notifications: true,
          subscribers: [Object],
          stream_id: 1,
          pin_to_top: false,
          email_address:
            'Denmark+986326cbbaef74fcb4c77cc41d47b12c@zulipdev.com:9991',
          audible_notifications: true,
          description: 'A Scandinavian country',
          in_home_view: true,
          push_notifications: false,
          name: 'Denmark',
        },
        {
          color: '#e79ab5',
          invite_only: false,
          desktop_notifications: true,
          subscribers: [Object],
          stream_id: 3,
          pin_to_top: false,
          email_address:
            'Scotland+a3a2dc96b0406d47c826041f773ee29a@zulipdev.com:9991',
          audible_notifications: true,
          description: 'Located in the United Kingdom',
          in_home_view: true,
          push_notifications: false,
          name: 'Scotland',
        },
      ],
    };
    common.stubNetwork(validator, output);
    const data = await streams(common.config).subscriptions.retrieve(params);
    data.should.have.property('result', 'success');
  });

  it('should fetch stream id', async () => {
    const params = {
      stream: 'bot testing',
    };
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/get_stream_id`);
      options.method.should.be.equal('GET');
      options.should.not.have.property('body');
      [...new URL(url).searchParams].should.have.deep.members([
        ['stream', params.stream],
      ]);
    };
    const output = {
      result: 'success',
      msg: '',
      stream_id: 94,
    };
    common.stubNetwork(validator, output);
    let data = await streams(common.config).getStreamId(params);
    data.should.have.property('result', 'success');
    data = await streams(common.config).getStreamId(params.stream);
    data.should.have.property('result', 'success');
  });

  it('should fetch the topics in a stream', async () => {
    const params = {
      stream_id: 15,
    };
    const validator = (url, options) => {
      url.should.contain(
        `${common.config.apiURL}/users/me/${params.stream_id}/topics`
      );
      options.method.should.be.equal('GET');
      options.should.not.have.property('body');
    };
    const output = {
      msg: '',
      result: 'success',
      topics: [
        {
          name: 'Denmark1',
          max_id: 128,
        },
        {
          name: 'Denmark3',
          max_id: 124,
        },
        {
          name: 'Denmark2',
          max_id: 117,
        },
      ],
    };
    common.stubNetwork(validator, output);
    const data = await streams(common.config).topics.retrieve(params);
    data.should.have.property('result', 'success');
    data.should.have.property('topics');
  });

  it('should delete stream by stream id', async () => {
    const params = {
      stream_id: 1,
    };
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/streams/${params.stream_id}`);
      options.should.not.have.property('body');
      options.method.should.be.equal('DELETE');
    };
    const output = {
      msg: '',
      result: 'success',
    };
    common.stubNetwork(validator, output);
    const data = await streams(common.config).deleteById(params);
    data.should.have.property('result', 'success');
  });
});

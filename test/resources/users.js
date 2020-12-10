const chai = require('chai');
const users = require('../../lib/resources/users');
const common = require('../common');
chai.use(require('chai-as-promised'));

chai.should();

describe('Users', () => {
  it('should fetch users', (done) => {
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/users`);
      options.method.should.be.equal('GET');
      options.should.not.have.property('body');
    };
    const output = {
      msg: '',
      result: 'success',
      members: [
        {
          email: 'iago@zulip.com',
          user_id: 5,
          full_name: 'Iago',
          bot_type: null,
          is_bot: false,
          is_admin: true,
          is_active: true,
          avatar_url:
            'https://secure.gravatar.com/avatar/af4f06322c177ef4e1e9b2c424986b54?d=identicon&version=1',
        },
        {
          email: 'cordelia@zulip.com',
          user_id: 3,
          full_name: 'Cordelia Lear',
          bot_type: null,
          is_bot: false,
          is_admin: false,
          is_active: true,
          avatar_url:
            'https://secure.gravatar.com/avatar/77c3871a68c8d70356156029fd0a4999?d=identicon&version=1',
        },
      ],
    };
    const stubs = common.getStubs(validator, output);
    users(common.config)
      .retrieve()
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      })
      .catch(done);
  });

  it('should fetch pointer for user', (done) => {
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/users/me/pointer`);
      options.method.should.be.equal('GET');
      options.should.not.have.property('body');
    };
    const output = {
      pointer: 171,
      msg: '',
      result: 'success',
    };
    const stubs = common.getStubs(validator, output);
    users(common.config)
      .me.pointer.retrieve()
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      })
      .catch(done);
  });

  it('should update pointer for user', (done) => {
    const pointer = 172;
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/users/me/pointer`);
      options.method.should.be.equal('POST');
      options.should.have.property('body');
      Object.keys(options.body.data).length.should.equal(1);
      options.body.data.pointer.should.equal(pointer);
    };
    const output = {
      msg: '',
      result: 'success',
    };
    const stubs = common.getStubs(validator, output);
    users(common.config)
      .me.pointer.update(pointer)
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      })
      .catch(done);
  });

  it('should fetch user profile', (done) => {
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/users/me`);
      options.method.should.be.equal('GET');
      options.should.not.have.property('body');
    };
    const output = {
      short_name: 'sample-bot',
      result: 'success',
      msg: '',
      is_bot: true,
      email: 'sample-bot@localhost',
      pointer: -1,
      max_message_id: 131,
      full_name: 'Sample',
      user_id: 45,
      client_id: '77431db17e4f32068756902d7c09c8bb',
      is_admin: false,
    };
    const stubs = common.getStubs(validator, output);
    users(common.config)
      .me.getProfile()
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      })
      .catch(done);
  });

  it('should subscribe user to stream', (done) => {
    const params = {
      subscriptions: JSON.stringify([{ name: 'off topic' }]),
    };
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/users/me/subscriptions`);
      options.method.should.be.equal('POST');
      options.should.have.property('body');
      Object.keys(options.body.data).length.should.equal(1);
      options.body.data.subscriptions.should.equal(params.subscriptions);
    };
    const output = {
      already_subscribed: {},
      result: 'success',
    };
    output[common.config.username] = ['off topic'];
    const stubs = common.getStubs(validator, output);
    users(common.config)
      .me.subscriptions.add(params)
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      })
      .catch(done);
  });

  it('should remove subscriptions', (done) => {
    const params = {
      subscriptions: JSON.stringify(['Verona']),
    };
    const validator = (url, options) => {
      url.should.equal(
        `${common.config.apiURL}/users/me/subscriptions?subscriptions=%5B%22Verona%22%5D`
      );
      options.method.should.be.equal('DELETE');
      options.should.not.have.property('body');
      options.method.should.be.equal('DELETE');
    };
    const output = {
      result: 'success',
      not_subscribed: [],
      msg: '',
      removed: JSON.stringify(['Verona']),
    };
    const stubs = common.getStubs(validator, output);
    users(common.config)
      .me.subscriptions.remove(params)
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      })
      .catch(done);
  });

  it('should create a new user', (done) => {
    const params = {
      email: 'newbie@zulip.com',
      password: 'temp',
      full_name: 'New User',
      short_name: 'newbie',
    };
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/users`);
      options.should.have.property('body');
      options.method.should.be.equal('POST');
      Object.keys(options.body.data).length.should.equal(4);
      options.body.data.email.should.equal(params.email);
      options.body.data.password.should.equal(params.password);
      options.body.data.full_name.should.equal(params.full_name);
      options.body.data.short_name.should.equal(params.short_name);
    };
    const output = {
      result: 'success',
      msg: '',
    };
    const stubs = common.getStubs(validator, output);
    users(common.config)
      .create(params)
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      })
      .catch(done);
  });

  it('should fetch users alert words', (done) => {
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/users/me/alert_words`);
      options.should.not.have.property('body');
      options.method.should.be.equal('GET');
    };
    const output = {
      result: 'success',
      msg: '',
    };
    const stubs = common.getStubs(validator, output);
    users(common.config)
      .me.alertWords.retrieve()
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      })
      .catch(done);
  });
});

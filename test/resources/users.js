const users = require('../../lib/resources/users');
const common = require('../common');
const chai = require('chai');
chai.use(require('chai-as-promised'));

chai.should();

describe('Users', () => {
  it('should fetch users', () => {
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/users`);
      options.should.not.have.property('body');
    };
    const output = {
      msg: '',
      result: 'success',
      members: [{
        email: 'iago@zulip.com',
        user_id: 5,
        full_name: 'Iago',
        bot_type: null,
        is_bot: false,
        is_admin: true,
        is_active: true,
        avatar_url: 'https://secure.gravatar.com/avatar/af4f06322c177ef4e1e9b2c424986b54?d=identicon&version=1',
      }, {
        email: 'cordelia@zulip.com',
        user_id: 3,
        full_name: 'Cordelia Lear',
        bot_type: null,
        is_bot: false,
        is_admin: false,
        is_active: true,
        avatar_url: 'https://secure.gravatar.com/avatar/77c3871a68c8d70356156029fd0a4999?d=identicon&version=1',
      }],
    };
    const stubs = common.getStubs(validator, output);
    users(common.config).retrieve().should.eventually.have.property('result', 'success');
    common.restoreStubs(stubs);
  });
  it('should fetch pointer for user', () => {
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/users/me/pointer`);
      options.should.not.have.property('body');
    };
    const output = {
      pointer: 171,
      msg: '',
      result: 'success',
    };
    const stubs = common.getStubs(validator, output);
    users(common.config).me.pointer.retrieve().should.eventually.have.property('result', 'success');
    common.restoreStubs(stubs);
  });
});

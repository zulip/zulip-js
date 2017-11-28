const accounts = require('../../lib/resources/accounts');
const common = require('../common');
const chai = require('chai');
chai.use(require('chai-as-promised'));

const assert = chai.assert;
chai.should();

const config = {
  username: 'valid@email.com',
  password: 'password',
  apiURL: 'valid.realm.url/api/v1',
};
const validator = (url, options) => {
  assert.equal(url, `${config.apiURL}/fetch_api_key`);
  assert.equal(Object.keys(options.body.data).length, 2);
  assert.equal(options.body.data.username, config.username);
  assert.equal(options.body.data.password, config.password);
  return true;
};

describe('Accounts', () => {
  it('should get API key', () => {
    const output = {
      result: 'success',
      msg: '',
      api_key: 'randomcharactersonlyq32YIpC8aMSH',
      email: config.email,
    };
    const stubs = common.getStubs(validator, output);
    accounts(config).retrieve().should.eventually.have.property('result', 'success');
    common.restoreStubs(stubs);
  });

  it('should return error on incorrect password', () => {
    const output = {
      result: 'error',
      msg: 'Your username or password is incorrect.',
      reason: 'incorrect_creds',
    };
    const stubs = common.getStubs(validator, output);
    accounts(config).retrieve().should.eventually.have.property('result', 'error');
    common.restoreStubs(stubs);
  });
});

const accounts = require('../../lib/resources/accounts');
const common = require('../common');
const chai = require('chai');
chai.use(require('chai-as-promised'));

chai.should();

const config = {
  username: 'valid@email.com',
  password: 'password',
  apiURL: 'valid.realm.url/api/v1',
};

const validator = (url, options) => {
  url.should.equal(`${config.apiURL}/fetch_api_key`);
  Object.keys(options.body.data).length.should.equal(2);
  options.body.data.username.should.equal(config.username);
  options.body.data.password.should.equal(config.password);
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

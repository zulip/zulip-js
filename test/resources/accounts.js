const chai = require('chai');
const accounts = require('../../lib/resources/accounts');
const common = require('../common');

chai.should();

const config = {
  username: 'valid@email.com',
  password: 'password',
  apiURL: 'valid.realm.url/api/v1',
};

const validator = (url, options) => {
  url.should.equal(`${config.apiURL}/fetch_api_key`);
  options.method.should.be.equal('POST');
  Object.keys(options.body.data).length.should.equal(2);
  options.body.data.username.should.equal(config.username);
  options.body.data.password.should.equal(config.password);
  return true;
};

describe('Accounts', () => {
  it('should get API key', async () => {
    const output = {
      result: 'success',
      msg: '',
      api_key: 'randomcharactersonlyq32YIpC8aMSH',
      email: config.email,
    };
    common.stubNetwork(validator, output);
    const data = await accounts(config).retrieve();
    data.result.should.be.equal('success');
  });

  it('should return error on incorrect password', async () => {
    const output = {
      result: 'error',
      msg: 'Your username or password is incorrect.',
      reason: 'incorrect_creds',
    };
    common.stubNetwork(validator, output);
    const data = await accounts(config).retrieve();
    data.result.should.be.equal('error');
  });
});

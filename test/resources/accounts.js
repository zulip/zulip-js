const accounts = require('../../lib/resources/accounts');
const chai = require('chai');
chai.use(require('chai-as-promised'));

const realm = process.env.ZULIP_REALM;
const apiURL = `${realm}/api/v1`;

const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  apiURL,
};

chai.should();
describe('Accounts', () => {
  it('Should get API key', () => {
    accounts(config).retrieve().should.eventually.have.property('result', 'success');
  });
});

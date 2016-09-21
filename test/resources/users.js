const users = require('../../lib/resources/users');
const chai = require('chai');
chai.use(require('chai-as-promised'));

const realm = process.env.ZULIP_REALM;
const apiURL = `${realm}/api/v1`;

const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  apiURL,
};

chai.should();
describe('Users', () => {
  it('Should fetch users', () => {
    users(config).retrieve().should.eventually.have.property('result', 'success');
  });
});

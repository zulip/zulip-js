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
  it('Should fetch pointer for user', () => {
    users(config).me.pointer.retrieve().should.eventually.have.property('result', 'success');
  });
  it('Should update pointer for user', () => {
    const id = 1;
    users(config).me.pointer.update(id).should.eventually.have.property('result', 'success');
  });
});

const emojis = require('../../lib/resources/emojis');
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
describe('Emojis', () => {
  it('Should fetch emojis', () => {
    emojis(config).retrieve().should.eventually.have.property('result', 'success');
  });
});

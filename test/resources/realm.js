const realm = require('../../lib/resources/realm');
const common = require('../common');
const chai = require('chai');
chai.use(require('chai-as-promised'));

chai.should();

describe('Realm', () => {
  it('should fetch realm emojis', (done) => {
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/realm/emoji`);
      options.should.not.have.property('body');
      options.method.should.be.equal('GET');
    };
    const output = {
      emoji: {
        3: {
          author: null,
          deactivated: false,
          name: 'jenkins',
          id: '3',
          source_url: '/user_avatars/2/emoji/images/3.png',
        },
      },
      msg: '',
      result: 'success',
    };
    const stubs = common.getStubs(validator, output);
    realm(common.config).retrieve()
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      }).catch(done);
  });
});

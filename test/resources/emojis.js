const chai = require('chai');
const emojis = require('../../lib/resources/emojis');
const common = require('../common');
chai.use(require('chai-as-promised'));

chai.should();

describe('Emojis', () => {
  it('should fetch emojis', (done) => {
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/realm/emoji`);
      options.method.should.be.equal('GET');
      options.should.not.have.property('body');
    };
    const output = {
      emoji: {
        green_tick: {
          source_url: '/user_avatars/1/emoji/green_tick.png',
          deactivated: false,
          author: {},
        },
      },
      msg: '',
      result: 'success',
    };
    const stubs = common.getStubs(validator, output);
    emojis(common.config).retrieve()
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      }).catch(done);
  });
});

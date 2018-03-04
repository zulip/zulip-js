const reactions = require('../../lib/resources/reactions');
const common = require('../common');
const chai = require('chai');
chai.use(require('chai-as-promised'));

chai.should();

describe('Reactions', () => {
  it('should add reaction to message', (done) => {
    const params = {
      message_id: 1,
      emoji: 'smile',
    };
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/reactions`);
      options.method.should.be.equal('POST');
      Object.keys(options.body.data).length.should.equal(2);
      options.body.data.message_id.should.equal(params.message_id);
      options.body.data.emoji.should.equal(params.emoji);
    };
    const output = {
      result: 'success',
      msg: '',
    };
    const stubs = common.getStubs(validator, output);
    reactions(common.config).add(params)
    .then((data) => {
      data.should.have.property('result', 'success');
      common.restoreStubs(stubs);
      done();
    }).catch(done);
  });

  it('should remove reaction from message', (done) => {
    const messageID = 1;
    const emoji = 'smile';
    const params = { message_id: messageID, emoji };
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/reactions?message_id=${messageID}&emoji=${emoji}`);
      options.method.should.be.equal('DELETE');
      options.should.not.have.property('body');
    };
    const output = {
      result: 'success',
      msg: '',
    };
    const stubs = common.getStubs(validator, output);
    reactions(common.config).remove(params)
    .then((data) => {
      data.should.have.property('result', 'success');
      common.restoreStubs(stubs);
      done();
    }).catch(done);
  });
});

const chai = require('chai');
const reactions = require('../../lib/resources/reactions');
const common = require('../common');

chai.should();

describe('Reactions', () => {
  it('should add reaction to message', async () => {
    const params = {
      message_id: 1,
      emoji_name: 'musical_note',
      emoji_code: '1f3b5',
      reaction_type: 'unicode_emoji',
    };
    const validator = (url, options) => {
      url.should.equal(
        `${common.config.apiURL}/messages/${params.message_id}/reactions`
      );
      options.method.should.be.equal('POST');
      Object.keys(options.body.data).length.should.equal(3);
      options.body.data.emoji_name.should.equal(params.emoji_name);
      options.body.data.emoji_code.should.equal(params.emoji_code);
      options.body.data.reaction_type.should.equal(params.reaction_type);
    };
    const output = {
      result: 'success',
      msg: '',
    };
    common.stubNetwork(validator, output);
    const data = await reactions(common.config).add(params);
    data.should.have.property('result', 'success');
  });

  it('should remove reaction from message', async () => {
    const params = {
      message_id: 1,
      emoji_code: '1f3b5',
      reaction_type: 'unicode_emoji',
    };
    const validator = (url, options) => {
      const path = `${common.config.apiURL}/messages/${params.message_id}/reactions`;
      const query = `emoji_code=${params.emoji_code}&reaction_type=${params.reaction_type}`;
      url.should.equal(`${path}?${query}`);
      options.method.should.be.equal('DELETE');
      options.should.not.have.property('body');
    };
    const output = {
      result: 'success',
      msg: '',
    };
    common.stubNetwork(validator, output);
    const data = await reactions(common.config).remove(params);
    data.should.have.property('result', 'success');
  });
});

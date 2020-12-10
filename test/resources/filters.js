const chai = require('chai');
const filters = require('../../lib/resources/filters');
const common = require('../common');

chai.should();

describe('Filters', () => {
  it('should fetch realm filters', async () => {
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/realm/filters`);
      options.should.not.have.property('body');
      options.method.should.be.equal('GET');
    };
    const output = {
      filters: [
        [
          '#(?P<id>[0-9]{2,8})',
          'https://github.com/zulip/zulip/pull/%(id)s',
          1,
        ],
      ],
      msg: '',
      result: 'success',
    };
    common.stubNetwork(validator, output);
    const data = await filters(common.config).retrieve();
    data.should.have.property('result', 'success');
  });
});

const filters = require('../../lib/resources/filters');
const common = require('../common');
const chai = require('chai');
chai.use(require('chai-as-promised'));

chai.should();

describe('Filters', () => {
  it('should fetch realm filters', (done) => {
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/realm/filters`);
      options.should.not.have.property('body');
      options.method.should.be.equal('GET');
    };
    const output = {
      filters: [
        ['#(?P<id>[0-9]{2,8})',
          'https://github.com/zulip/zulip/pull/%(id)s',
          1],
      ],
      msg: '',
      result: 'success',
    };
    const stubs = common.getStubs(validator, output);
    filters(common.config).retrieve()
      .then((data) => {
        data.should.have.property('result', 'success');
        common.restoreStubs(stubs);
        done();
      }).catch(done);
  });
});

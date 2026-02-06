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

  it('should create a realm filter', async () => {
    const params = {
      pattern: '#(?P<id>[0-9]{2,8})',
      url_format_string: 'https://github.com/zulip/zulip/pull/%(id)s',
    };
    const validator = (url, options) => {
      url.should.equal(`${common.config.apiURL}/realm/filters`);
      options.method.should.be.equal('POST');
      Object.keys(options.body.data).length.should.equal(2);
      options.body.data.pattern.should.equal(params.pattern);
      options.body.data.url_format_string.should.equal(
        params.url_format_string,
      );
    };
    const output = {
      id: 1,
      msg: '',
      result: 'success',
    };
    common.stubNetwork(validator, output);
    const data = await filters(common.config).create(params);
    data.should.have.property('result', 'success');
  });

  it('should delete realm filter by id', async () => {
    const params = {
      filter_id: 1,
    };
    const validator = (url, options) => {
      url.should.contain(
        `${common.config.apiURL}/realm/filters/${params.filter_id}`,
      );
      options.should.not.have.property('body');
      options.method.should.be.equal('DELETE');
    };
    const output = {
      msg: '',
      result: 'success',
    };
    common.stubNetwork(validator, output);
    const data = await filters(common.config).deleteById(params);
    data.should.have.property('result', 'success');
  });
});

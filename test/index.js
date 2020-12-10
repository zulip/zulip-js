const chai = require('chai');
const lib = require('../lib/index');
const common = require('./common');

chai.should();

const params = {
  one: '123',
  two: '456',
};

const output = {
  data: 'random',
  msg: '',
  result: 'success',
};

describe('Index', () => {
  it('should call get endpoints', async () => {
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/testurl`);
      options.method.should.be.equal('GET');
      options.should.not.have.property('body');
      [...new URL(url).searchParams].should.have.deep.members([
        ['one', params.one],
        ['two', params.two],
      ]);
    };
    const z = await lib(common.config);
    common.stubNetwork(validator, output);
    (await z.callEndpoint('/testurl', 'GET', params)).should.have.property(
      'result',
      'success'
    );
    (await z.callEndpoint('testurl', 'GET', params)).should.have.property(
      'result',
      'success'
    );
  });
  it('should call post endpoints', async () => {
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/testurl`);
      options.method.should.be.equal('POST');
      Object.keys(options.body.data).length.should.equal(2);
      options.body.data.one.should.equal(params.one);
      options.body.data.two.should.equal(params.two);
    };
    const z = await lib(common.config);
    common.stubNetwork(validator, output);
    (await z.callEndpoint('/testurl', 'POST', params)).should.have.property(
      'result',
      'success'
    );
    (await z.callEndpoint('testurl', 'POST', params)).should.have.property(
      'result',
      'success'
    );
  });
});

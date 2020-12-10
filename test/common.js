const sinon = require('sinon');
const helper = require('../lib/helper');

const getFakes = (validator, output) => {
  const fetch = (url, options) => {
    validator(url, options);
    const rval = (function rval() {
      const json = function json() {
        return output;
      };
      return {
        json,
      };
    })();
    return Promise.resolve(rval);
  };
  const FormData = () => {
    const data = {};
    return {
      append(key, value) {
        data[key] = value;
      },
      data,
    };
  };
  return {
    fetch,
    FormData,
  };
};

const sandbox = sinon.createSandbox();

const stubNetwork = (validator, output) => {
  const fakes = getFakes(validator, output);
  sandbox.stub(helper, 'fetch').callsFake(fakes.fetch);
  sandbox.stub(helper, 'FormData').callsFake(fakes.FormData);
};

afterEach(() => {
  sandbox.restore();
});

const config = {
  username: 'valid@email.com',
  apiKey: 'randomcharactersonlyq32YIpC8aMSH',
  apiURL: 'https://valid.realm.url/api/v1',
  realm: 'https://valid.realm.url/api',
};

module.exports = {
  getFakes,
  stubNetwork,
  config,
};

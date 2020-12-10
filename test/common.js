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

const getStubs = (validator, output) => {
  const stubs = [];
  const fakes = getFakes(validator, output);
  stubs.push(sinon.stub(helper, 'fetch').callsFake(fakes.fetch));
  stubs.push(sinon.stub(helper, 'FormData').callsFake(fakes.FormData));
  return stubs;
};

const restoreStubs = (stubs) => {
  stubs.forEach((stub) => {
    stub.restore();
  });
};

const config = {
  username: 'valid@email.com',
  apiKey: 'randomcharactersonlyq32YIpC8aMSH',
  apiURL: 'https://valid.realm.url/api/v1',
  realm: 'https://valid.realm.url/api',
};

module.exports = {
  getFakes,
  getStubs,
  restoreStubs,
  config,
};

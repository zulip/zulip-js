require('es6-promise').polyfill();
require('isomorphic-fetch');
require('isomorphic-form-data');

function api(baseUrl, config, method, params) {
  let url = baseUrl;
  const auth = new Buffer(`${config.username}:${config.apiKey}`).toString('base64');
  const authHeader = `Basic ${auth}`;
  const options = { method, headers: { Authorization: authHeader } };
  if (method === 'POST') {
    options.body = new FormData();
    Object.keys(params).forEach((key) => {
      options.body.append(key, params[key]);
    });
  } else {
    const generateQueryParam = key => `${key}=${params[key]}`;
    const queryParams = Object.keys(params).map(generateQueryParam);
    url = `${url}?${queryParams.join('&')}`;
  }
  return fetch(url, options).then(res => res.json());
}

module.exports = api;

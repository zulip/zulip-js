require('es6-promise').polyfill();
const helper = require('./helper');

function api(baseUrl, config, method, params) {
  let url = baseUrl;
  const auth = Buffer.from(`${config.username}:${config.apiKey}`).toString('base64');
  const authHeader = `Basic ${auth}`;
  const options = { method, headers: { Authorization: authHeader } };
  if (method === 'POST') {
    options.body = new helper.FormData();
    Object.keys(params).forEach((key) => {
      options.body.append(key, params[key]);
    });
  } else if (params) {
    const generateQueryParam = (key) => `${key}=${params[key]}`;
    const queryParams = Object.keys(params).map(generateQueryParam);
    url = `${url}?${queryParams.join('&')}`;
  }
  return helper.fetch(url, options).then((res) => res.json());
}

module.exports = api;

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
  let response = null;
  return helper.fetch(url, options).then((res) => {
    response = res;
    return res.json();
  }).catch((e) => {
    if (e instanceof SyntaxError) {
      // We probably got a non-JSON response from the server.
      // We should inform the user of the same.
      let message = 'Server Returned a non-JSON response.';
      if (response.status === 404) {
        message += ` Maybe endpoint: ${method} ${response.url.replace(config.apiURL, '')} doesn't exist.`;
      } else {
        message += ' Please check the API documentation.';
      }
      const error = new Error(message);
      error.res = response;
      throw error;
    }
    throw e;
  });
}

module.exports = api;

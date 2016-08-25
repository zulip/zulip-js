'use strict';
const fetch = require('node-fetch');
const FormData = require('form-data');

module.exports = (url, config, method, params) => {
  const auth = "Basic " + new Buffer(config.username + ":" + config.apiKey).toString("base64");
  let body = '';
  if (method == 'POST') {
    body = new FormData();
    for (let key in params) {
      body.append(key, params[key]);
    }
  } else {
    url += '?';
    for (let key in params) {
      url += key + "=" + params[key] + "&";
    }
  }
  return fetch(url, {
    method: method,
    body: body,
    headers: {
      'Authorization': auth
    }
  }).then(res => res.json());
};

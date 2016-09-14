'use strict';
require('es6-promise').polyfill();
require('isomorphic-fetch');
const FormData = require('form-data');

module.exports = (url, config, method, params) => {
  const auth = "Basic " + new Buffer(config.username + ":" + config.apiKey).toString("base64");
  const options = { method: method, headers: { 'Authorization': auth } };
  if (method == 'POST') {
    options.body = new FormData();
    for (let key in params) {
      body.append(key, params[key]);
    }
  } else {
    url += '?';
    for (let key in params) {
      url += key + "=" + params[key] + "&";
    }
  }
  return fetch(url, options).then(res => res.json());
};

'use strict';
const fetch = require('node-fetch');
const FormData = require('form-data');

function api(url, config, method) {
  const auth = "Basic " + new Buffer(config.username + ":" + config.apiKey).toString("base64");
  return fetch(url, {
    method: method,
    headers: {
      'Authorization': auth
    }
  }).then(res => res.json());
}

module.exports = (config) => {
  return {
    subscriptions: () => {
      const url = config.apiURL + '/users/me/subscriptions'
      return api(url, config, 'GET');
    }
  };
};

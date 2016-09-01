'use strict';
require('es6-promise').polyfill();
require('isomorphic-fetch');
const FormData = require('form-data');

module.exports = (config) => {
  return {
    retrieve: () => {
      let form = new FormData();
      form.append('username', config.username);
      form.append('password', config.password);
      const url = config.apiURL + '/fetch_api_key';
      return fetch(url, {
        method: 'POST',
        body: form
      }).then(res => res.json());
    }
  };
};

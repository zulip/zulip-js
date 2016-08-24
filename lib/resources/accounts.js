'use strict';
const fetch = require('node-fetch');
const FormData = require('form-data');

module.exports = {
  retrieve: function(apiURL, username, password) {
    let form = new FormData();
    form.append('username', username);
    form.append('password', password);
    const url = apiURL + '/fetch_api_key';
    return fetch(url, {
      method: 'POST',
      body: form
    }).then(res => res.json());
  }
}

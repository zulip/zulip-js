require('es6-promise').polyfill();
require('isomorphic-fetch');
require('isomorphic-form-data');

function accounts(config) {
  return {
    retrieve: () => {
      const url = `${config.apiURL}/fetch_api_key`;
      const form = new FormData();
      form.append('username', config.username);
      form.append('password', config.password);
      return fetch(url, {
        method: 'POST',
        body: form,
      }).then(res => res.json());
    },
    dev: {
      retrieve: () => {
        const url = `${config.apiURL}/dev_fetch_api_key`;
        const form = new FormData();
        form.append('username', config.username);
        return fetch(url, {
          method: 'POST',
          body: form,
        }).then(res => res.json());
      },
    },
  };
}

module.exports = accounts;

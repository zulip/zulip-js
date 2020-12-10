const helper = require('../helper');

function accounts(config) {
  return {
    retrieve: () => {
      const url = `${config.apiURL}/fetch_api_key`;
      const form = new helper.FormData();
      form.append('username', config.username);
      form.append('password', config.password);
      return helper
        .fetch(url, {
          method: 'POST',
          body: form,
        })
        .then((res) => res.json());
    },
  };
}

module.exports = accounts;

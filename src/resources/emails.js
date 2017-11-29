const api = require('../api');

function emails(config) {
  return {
    dev: {
      retrieve: (params) => {
        const url = `${config.apiURL}/dev_get_emails`;

        return api(url, config, 'GET', params);
      },
    },
  };
}

module.exports = emails;

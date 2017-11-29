const api = require('../api');

function messages(config) {
  return {
    retrieve: (initialParams) => {
      const url = `${config.apiURL}/messages`;
      const params = initialParams;
      if (params.narrow) {
        params.narrow = JSON.stringify(params.narrow);
      }
      return api(url, config, 'GET', params);
    },
    send: (params) => {
      const url = `${config.apiURL}/messages`;
      return api(url, config, 'POST', params);
    },
    // TODO : Improve and finalize
    flags: {
      retrieve: (params) => {
        const url = `${config.apiURL}/messages/flags`;
        return api(url, config, 'POST', params);
      },
    },
  };
}

module.exports = messages;

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
    render: (initialParams) => {
      const url = `${config.apiURL}/messages/render`;
      let params = initialParams;
      if (typeof (initialParams) === 'string') {
        params = {
          content: initialParams,
        };
      }
      return api(url, config, 'POST', params);
    },
    update: (params) => {
      const url = `${config.apiURL}/messages/${params.message_id}`;
      return api(url, config, 'PATCH', params);
    },
  };
}

module.exports = messages;

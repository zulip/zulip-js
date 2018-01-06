const api = require('../api');

function messages(config) {
  const baseURL = `${config.apiURL}/messages`;
  const flagsURL = `${baseURL}/flags`;
  return {
    retrieve: (initialParams) => {
      const params = initialParams;
      if (params.narrow) {
        params.narrow = JSON.stringify(params.narrow);
      }
      return api(baseURL, config, 'GET', params);
    },
    send: params => api(baseURL, config, 'POST', params),
    flags: {
      add: (initialParams) => {
        // params.flag can be one of 'read', 'starred', 'mentioned',
        // 'wildcard_mentioned', 'has_alert_word', 'historical',
        const params = initialParams;
        params.op = 'add';
        if (params.messages) {
          params.messages = JSON.stringify(params.messages);
        }
        return api(flagsURL, config, 'POST', params);
      },
      remove: (initialParams) => {
        // params.flag can be one of 'read', 'starred', 'mentioned',
        // 'wildcard_mentioned', 'has_alert_word', 'historical',
        const params = initialParams;
        params.op = 'remove';
        if (params.messages) {
          params.messages = JSON.stringify(params.messages);
        }
        return api(flagsURL, config, 'POST', params);
      },
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
  };
}

module.exports = messages;

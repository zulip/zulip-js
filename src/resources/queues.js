const api = require('../api');

function queues(config) {
  return {
    register: (initialParams) => {
      const url = `${config.apiURL}/register`;
      const params = initialParams;
      if (params.event_types) {
        params.event_types = JSON.stringify(params.event_types);
      }
      return api(url, config, 'POST', params);
    },
  };
}

module.exports = queues;

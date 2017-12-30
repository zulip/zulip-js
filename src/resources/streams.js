const api = require('../api');

function streams(config) {
  return {
    retrieve: () => {
      const url = `${config.apiURL}/streams`;
      return api(url, config, 'GET');
    },
    subscriptions: {
      retrieve: () => {
        const url = `${config.apiURL}/users/me/subscriptions`;
        return api(url, config, 'GET');
      },
    },
    getStreamId: (initialParams) => {
      const url = `${config.apiURL}/get_stream_id`;
      let params = initialParams;
      if (typeof (initialParams) === 'string') {
        params = {
          stream: initialParams,
        };
      }
      return api(url, config, 'GET', params);
    },
  };
}

module.exports = streams;

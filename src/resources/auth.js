const api = require('../api');

function auth(config) {
  return {
    backends: {
      /**
       * Retrieves the auth backends available. Returns a promise which in turns will return an
       * array of available backend names
       * @param params
       * @returns {*}
       */
      retrieve: (params) => {
        const url = `${config.apiURL}/get_auth_backends`;

        return api(url, config, 'GET', params).then((res) => {
          const backends = [];

          if (res.result === 'success') {
            if (res.password) backends.push('password');
            if (res.google) backends.push('google');
            if (res.dev) backends.push('dev');
          }

          if (!backends) {
            throw new Error('No backends available.');
          }

          return backends;
        });
      },
    },
  };
}

module.exports = auth;

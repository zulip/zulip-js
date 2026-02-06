const api = require('../api');

function filters(config) {
  const baseURL = `${config.apiURL}/realm/filters`;

  return {
    retrieve: (params) => api(baseURL, config, 'GET', params),

    create: (params) => api(baseURL, config, 'POST', params),

    deleteById: (params) => {
      const url = `${baseURL}/${params.filter_id}`;
      return api(url, config, 'DELETE', params);
    },
  };
}

module.exports = filters;

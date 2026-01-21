const api = require('../api');

function mark(config) {
  return {
    all: (params) => {
      const url = `${config.apiURL}/mark_all_as_read`;
      return api(url, config, 'POST', params);
    },
    stream: (params) => {
      const url = `${config.apiURL}/mark_stream_as_read`;
      return api(url, config, 'POST', params);
    },
    topic: (params) => {
      const url = `${config.apiURL}/mark_topic_as_read`;
      return api(url, config, 'POST', params);
    },
  };
}

module.exports = mark;

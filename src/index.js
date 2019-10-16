import parseConfigFile from './zuliprc';

const api = require('./api');

const accounts = require('./resources/accounts');
const streams = require('./resources/streams');
const messages = require('./resources/messages');
const queues = require('./resources/queues');
const events = require('./resources/events');
const users = require('./resources/users');
const emojis = require('./resources/emojis');
const typing = require('./resources/typing');
const reactions = require('./resources/reactions');
const server = require('./resources/server');
const filters = require('./resources/filters');

function getCallEndpoint(config) {
  return function callEndpoint(endpoint, method = 'GET', params) {
    const myConfig = { ...config };
    let finalendpoint = endpoint;
    if (!endpoint.startsWith('/')) {
      finalendpoint = `/${endpoint}`; // eslint-disable-line
    }
    const url = myConfig.apiURL + finalendpoint;
    return api(url, myConfig, method, params);
  };
}


function resources(config) {
  return {
    config,
    callEndpoint: getCallEndpoint(config),
    accounts: accounts(config),
    streams: streams(config),
    messages: messages(config),
    queues: queues(config),
    events: events(config),
    users: users(config),
    emojis: emojis(config),
    typing: typing(config),
    reactions: reactions(config),
    server: server(config),
    filters: filters(config),
  };
}

function zulip(initialConfig) {
  if (initialConfig.zuliprc) {
    return parseConfigFile(initialConfig.zuliprc).then((config) => resources(config));
  }
  const config = initialConfig;
  if (config.realm.endsWith('/api')) {
    config.apiURL = `${config.realm}/v1`;
  } else {
    config.apiURL = `${config.realm}/api/v1`;
  }

  if (!config.apiKey) {
    return accounts(config).retrieve().then((res) => {
      config.apiKey = res.api_key;
      return resources(config);
    });
  }
  return Promise.resolve(resources(config));
}

module.exports = zulip;

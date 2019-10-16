const path = require('path');
const homedir = require('os').homedir();
const zulip = require('../lib');

if (process.argv[2] === 'help') {
  console.log('This is a helper script to test Zulip APIs.');
  console.log('Call with: npm run call <method> <endpoint> <json_params> <zuliprc path>.');
  console.log('Put your zuliprc file in ~/.zuliprc or specify the 4th argument above.');
  process.exit(0);
}
const method = process.argv[2] || 'GET';
const endpoint = process.argv[3] || '/users/me';
const params = process.argv[4] || '';
const zuliprc = process.argv[5] ? path.resolve(__dirname, process.argv[5]) : path.resolve(homedir, '.zuliprc');

zulip({ zuliprc })
  .then((z) => z.callEndpoint(endpoint, method, params))
  .then(console.log)
  .catch((err) => console.log(err.message));

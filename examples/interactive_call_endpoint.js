const path = require('path');
const homedir = require('os').homedir();
const zulip = require('../lib');

if (process.argv[2] === 'help') {
  console.log('This is a helper script to test Zulip APIs.');
  console.log(
    'Call with: npm run call <method> <endpoint> <json_params> <zuliprc path>.'
  );
  console.log(
    'Put your zuliprc file in ~/.zuliprc or specify the 4th argument above.'
  );
  process.exit(0);
}
const method = process.argv[2] || 'GET';
const endpoint = process.argv[3] || '/users/me';
const params = JSON.parse(process.argv[4] || '{}');
const zuliprc = process.argv[5]
  ? path.resolve(__dirname, process.argv[5])
  : path.resolve(homedir, '.zuliprc');

(async () => {
  const z = await zulip({ zuliprc });
  console.log(await z.callEndpoint(endpoint, method, params));
})();

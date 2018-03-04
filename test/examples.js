const zulip = require('../lib/index');
const chai = require('chai');
const fs = require('fs');
chai.use(require('chai-as-promised'));

chai.should();
const fixtures = JSON.parse(fs.readFileSync('./test/fixtures.json', 'utf-8'));
const examples = [];
// Just the tokens for my local test server. Temporary.
const config = {
  username: 'cookie-bot@localhost',
  apiKey: 'dLfydLvW3tJvSjwXZscOWKDyfl2vPfLI',
  realm: 'http://localhost:9991/api',
};

examples.push({
  name: 'stream-message',
  code(client) {
    // {code_example|start}
    return client.messages.send({
      to: 'Denmark',
      type: 'stream',
      subject: 'Castle',
      content: 'Something is rotten in the state of Denmark.',
    });
    // {code_example|end}
  },
});

examples.push({
  name: 'private-message',
  code(client) {
    // {code_example|start}
    return client.messages.send({
      type: 'private',
      to: 'iago@zulip.com',
      content: 'I come not, friends, to steal away your hearts.',
    });
    // {code_example|end}
  },
});

describe('Examples', () => {
  it('should begin testing', (done) => {
    // Without something like this, it doesn't detect other tests.
    // Weird, but can work around by simply placing an empty test.
    done();
  });
  zulip(config).then((client) => {
    examples.forEach((elem) => {
      it(`should pass example: ${elem.name}`, (done) => {
        elem.code(client).then((result) => {
          result.should.deep.equal(fixtures[elem.name]);
          done();
        }).catch(done);
      });
    });
  });
});

// // Strings for adding to the example in the markdown.
// const preExample = `
// const zulip = require('zulip-js');
// // Download zuliprc-dev from your dev server
// const config = {
//     zuliprc: 'zuliprc-dev',
// };
// zulip(config).then((client) => {
// `;

// const postExample = `
// .then((result) => {
//     console.log(result);
// })
// .catch((error) => {
//     console.error(error);
// });
// `;

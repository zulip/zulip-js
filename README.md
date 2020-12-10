# zulip-js [![Build Status](https://travis-ci.com/zulip/zulip-js.svg?branch=master)](https://travis-ci.com/github/zulip/zulip-js)

Javascript library to access the Zulip API

# Usage

## Initialization

### With API Key

```js
const zulip = require('zulip-js');
const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM,
};

(async () => {
  const zulip = await zulip(config);
  // The zulip object now initialized with config
  console.log(await zulip.streams.subscriptions.retrieve());
})();
```

### With Username & Password

You will need to first retrieve the API key by calling `await zulip(config)`.

```js
const zulip = require('zulip-js');
const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM,
};

(async () => {
  // Fetch API Key
  const zulip = await zulip(config);
  // The zulip object now contains the API Key
  console.log(await zulip.streams.subscriptions.retrieve());
})();
```

### With zuliprc

Create a file called `zuliprc` (in the same directory as your code) which looks like:

```
[api]
email=cordelia@zulip.com
key=wlueAg7cQXqKpUgIaPP3dmF4vibZXal7
site=http://localhost:9991
```

Please remember to add this file to your `.gitignore`! Calling `await zulip({ zuliprc: 'zuliprc' })` will read this file.

```js
const zulip = require('zulip-js');
const path = require('path');
const zuliprc = path.resolve(__dirname, 'zuliprc');
(async () => {
  const zulip = await zulip({ zuliprc });
  // The zulip object now contains the config from the zuliprc file
  console.log(await zulip.streams.subscriptions.retrieve());
})();
```

## Examples

Please see some examples in [the examples directory](https://github.com/zulip/zulip-js/tree/master/examples).

Also, to easily test an API endpoint while developing, you can run:

```
$ npm run build
$ npm run call <method> <endpoint> [optional: json_params] [optional: path to zuliprc file]
$ # For example:
$ npm run call GET /users/me
$ npm run call GET /users/me '' ~/path/to/my/zuliprc
```

## Supported endpoints

We support the following endpoints and are striving to have complete coverage of the API. If you want to use some endpoint we do not support presently, you can directly call it as follows:

```js
const params = {
  to: 'bot testing',
  type: 'stream',
  subject: 'Testing zulip-js',
  content: 'Something is horribly wrong....',
};

await zulip.callEndpoint('/messages', 'POST', params);
```

| Function to call | API Endpoint | Documentation |
| --- | --- | --- |
| `zulip.accounts.retrieve()` | POST `/fetch_api_key` | returns a promise that you can use to retrieve your `API key`. |
| `zulip.emojis.retrieve()` | GET `/realm/emoji` | retrieves the list of realm specific emojis. |
| `zulip.events.retrieve()` | GET `/events` | retrieves events from a queue. You can pass it a params object with the id of the queue you are interested in, the last event id that you have received and wish to acknowledge. You can also specify whether the server should not block on this request until there is a new event (the default is to block). |
| `zulip.messages.send()` | POST `/messages` | returns a promise that can be used to send a message. |
| `zulip.messages.retrieve()` | GET `/messages` | returns a promise that can be used to retrieve messages from a stream. You need to specify the id of the message to be used as an anchor. Use `1000000000` to retrieve the most recent message, or [`zulip.users.me.pointer.retrieve()`](#fetching-a-pointer-for-a-user) to get the id of the last message the user read. |
| `zulip.messages.render()` | POST `/messages/render` | returns a promise that can be used to get rendered HTML for a message text. |
| `zulip.messages.update()` | PATCH `/messages/<msg_id>` | updates the content or topic of the message with the given `msg_id`. |
| `zulip.messages.flags.add()` | POST `/messages/flags` | add a flag to a list of messages. Its params are `flag` which is one of `[read, starred, mentioned, wildcard_mentioned, has_alert_word, historical]` and `messages` which is a list of messageIDs. |
| `zulip.messages.flags.remove()` | POST `/messages/flags` | remove a flag from a list of messages. Its params are `flag` which is one of `[read, starred, mentioned, wildcard_mentioned, has_alert_word, historical]` and `messages` which is a list of messageIDs. |
| `zulip.messages.getById()` | GET `/messages/<msg_id>` | returns a message by its id. |
| `zulip.messages.getHistoryById()` | GET `/messages/<msg_id>/history` | return the history of a message |
| `zulip.messages.deleteReactionById()` | DELETE `/messages/<msg_id>/reactions` | deletes reactions on a message by message id |
| `zulip.messages.deleteById()` | DELETE `/messages/<msg_id>` | delete the message with the provided message id if the user has permission to do so. |
| `zulip.queues.register()` | POST `/register` | registers a new queue. You can pass it a params object with the types of events you are interested in and whether you want to receive raw text or html (using markdown). |
| `zulip.queues.deregister()` | DELETE `/events` | deletes a previously registered queue. |
| `zulip.reactions.add()` | POST `/reactions` | add a reaction to a message. Accepts a params object with `message_id`, `emoji_name`, `emoji_code` and `reaction_type` (default is `unicode_emoji`). |
| `zulip.reactions.remove()` | DELETE `/reactions` | remove a reaction from a message. Accepts a params object with `message_id` and `emoji_code` and `reaction_type` (default is `unicode_emoji`). |
| `zulip.streams.retrieve()` | GET `/streams` | returns a promise that can be used to retrieve all streams. |
| `zulip.streams.getStreamId()` | GET `/get_stream_id` | returns a promise that can be used to retrieve a stream's id. |
| `zulip.streams.subscriptions.retrieve()` | GET `/users/me/subscriptions` | returns a promise that can be used to retrieve the user's subscriptions. |
| `zulip.streams.deleteById()` | DELETE `/streams/<stream_id>` | delete the stream with the provided stream id if the user has permission to do so. |
| `zulip.streams.topics.retrieve()` | GET `/users/me/<stream_id>/topics` | retrieves all the topics in a specific stream. |
| `zulip.typing.send()` | POST `/typing` | can be used to send a typing notification. The parameters required are `to` (either a username or a list of usernames) and `op` (either `start` or `stop`). |
| `zulip.users.retrieve()` | GET `/users` | retrieves all users for this realm. |
| `zulip.users.me.pointer.retrieve()` | GET `/users/me/pointer` | retrieves a pointer for a user. The pointer is the id of the last message the user read. This can then be used as an anchor message id for subsequent API calls. |
| `zulip.users.me.getProfile()` | GET `/users/me` | retrieves the profile of the user/bot. |
| `zulip.users.me.subscriptions()` | POST `/users/me/subscriptions` | subscribes a user to a stream/streams. |
| `zulip.users.create()` | POST `/users` | create a new user. |
| `zulip.users.me.alertWords.retrieve()` | GET `/users/me/alert_words` | get array of a user's alert words. |
| `zulip.users.me.subscriptions.remove()` | DELETE `/users/me/subscriptions` | remove subscriptions. |
| `zulip.users.me.pointer.update()` | POST `users/me/pointer` | updates the pointer for the user, for moving the home view. Accepts a message id. This has the side effect of marking some messages as read. Will not return success if the message id is invalid. Will always succeed if the id is less than the current value of the pointer (the id of the last message read). |
| `zulip.server.settings()` | GET `/server_settings` | returns a dictionary of server settings. |
| `zulip.filters.retrieve()` | GET `realm/filters` | return a list of filters in a realm |

# Testing

Use `npm test` to run the tests.

## Writing Tests

Currently, we have a simple testing framework which stubs our network requests and also allows us to test the input passed to it. This is what a sample test for an API endpoint looks like:

```js
const chai = require('chai');
const users = require('../../lib/resources/users'); // File to test.
const common = require('../common'); // Common functions for tests.

chai.should();

describe('Users', () => {
  it('should fetch users', async () => {
    const params = {
      subject: 'test',
      content: 'sample test',
    };
    const validator = (url, options) => {
      // Function to test the network request parameters.
      url.should.equal(`${common.config.apiURL}/users`);
      Object.keys(options.body.data).length.should.equal(4);
      options.body.data.subject.should.equal(params.subject);
      options.body.data.content.should.equal(params.content);
    };
    const output = {
      // The data returned by the API in JSON format.
      already_subscribed: {},
      result: 'success',
    };
    common.stubNetwork(validator, output); // Stub the network modules.
    const data = await users(common.config).retrieve(params);
    data.should.have.property('result', 'success'); // Function call.
  });
});
```

Each pull request should contain relevant tests as well as example usage.

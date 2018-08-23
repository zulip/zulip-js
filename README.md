# zulip-js [![Build Status](https://travis-ci.org/zulip/zulip-js.svg?branch=master)](https://travis-ci.org/zulip/zulip-js)
Javascript library to access the Zulip API

# Usage
## Initialization
### With API Key
```js
const config = {
  username: process.env.ZULIP_USERNAME,
  apiKey: process.env.ZULIP_API_KEY,
  realm: process.env.ZULIP_REALM
};

zulip(config).then(zulip => {
  // The zulip object now initialized with config
  zulip.streams.subscriptions().then(res => {
    console.log(res);
  });
});
```

### With Username & Password
You will need to first retrieve the API key by calling `zulip(config)` and then use the zulip object that it passes to `.then()`

```js
const zulip = require('zulip-js');
const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM
};

//Fetch API Key
zulip(config).then(zulip => {
  // The zulip object now contains the API Key
  zulip.streams.subscriptions().then(res => {
    console.log(res);
  });
});
```

### With zuliprc
Create a file called `zuliprc` (in the same directory as your code) which looks like:
```
[api]
email=cordelia@zulip.com
key=wlueAg7cQXqKpUgIaPP3dmF4vibZXal7
site=http://localhost:9991
```

Please remember to add this file to your `.gitignore`!
Calling `zulip({ zuliprc: 'zuliprc' } )` will read this file and then pass a configured zulip object to `.then()`.

```js
const zulip = require('zulip-js');
const path = require('path');
const zuliprc = path.resolve(__dirname, 'zuliprc');
zulip({ zuliprc }).then(zulip => 
  // The zulip object now contains the config from the zuliprc file
  zulip.streams.subscriptions().then(res => {
    console.log(res);
  });
});
```

## Examples

Please see some examples in [the examples directory](https://github.com/zulip/zulip-js/tree/master/examples).

## Supported endpoints

We support the following endpoints and are striving to have complete coverage of the API. If you want to use some endpoint we do not support presently, you can directly call it as follows:

```js
const params = {
  to: 'bot testing',
  type: 'stream',
  subject: 'Testing zulip-js',
  content: 'Something is horribly wrong....',
};

zulip.callEndpoint('/messages', 'POST', params);
```

| Function to call | API Endpoint | Documentation |
| --- | --- | --- |
| `zulip.accounts.retrieve()` | POST `/fetch_api_key` | returns a promise that you can use to retrieve your `API key`. |
| `zulip.emojis.retrieve()` | GET `/realm/emoji` | retrieves the list of realm specific emojis. |
| `zulip.events.retrieve()` | GET `/events` | retrieves events from a queue. You can pass it a params object with the id of the queue you are interested in, the last event id that you have received and wish to acknowlege. You can also specify whether the server should not block on this request until there is a new event (the default is to block). |
| `zulip.messages.send()` | POST `/messages` | returns a promise that can be used to send a message.|
| `zulip.messages.retrieve()` | GET `/messages` | returns a promise that can be used to retrieve messages from a stream. You need to specify the id of the message to be used as an anchor. Use `1000000000` to retrieve the most recent message, or [`zulip.users.me.pointer.retrieve()`](#fetching-a-pointer-for-a-user) to get the id of the last message the user read. |
| `zulip.messages.render()` | POST `/messages/render` | returns a promise that can be used to get rendered HTML for a message text. |
| `zulip.messages.update()` | PATCH `/messages/<msg_id>` | updates the content or topic of the message with the given `msg_id`. |
| `zulip.messages.flags.add()` | POST `/messages/flags` | add a flag to a list of messages. Its params are `flag` which is one of `[read, starred, mentioned, wildcard_mentioned, has_alert_word, historical]` and `messages` which is a list of messageIDs. |
| `zulip.messages.flags.remove()` | POST `/messages/flags` | remove a flag from a list of messages. Its params are `flag` which is one of `[read, starred, mentioned, wildcard_mentioned, has_alert_word, historical]` and `messages` which is a list of messageIDs. |
| `zulip.messages.getById()` | GET `/messages/<msg_id>` | returns a message by its id. |
| `zulip.queues.register()` | POST `/register` | registers a new queue. You can pass it a params object with the types of events you are interested in and whether you want to receive raw text or html (using markdown). |
| `zulip.queues.deregister()` | DELETE `/events` | deletes a previously registered queue. |
| `zulip.reactions.add()` | POST `/reactions` | add a reaction to a message. Accepts a params object with `message_id`, `emoji_name`, `emoji_code` and `reaction_type` (default is `unicode_emoji`). |
| `zulip.reactions.remove()` | DELETE `/reactions` | remove a reaction from a message. Accepts a params object with `message_id` and `emoji_code` and `reaction_type` (default is `unicode_emoji`). |
| `zulip.streams.retrieve()` | GET `/streams` | returns a promise that can be used to retrieve all streams. |
| `zulip.streams.getStreamId()` | GET `/get_stream_id` | returns a promise that can be used to retrieve a stream's id. |
| `zulip.streams.subscriptions.retrieve()` | GET `/users/me/subscriptions` | returns a promise that can be used to retrieve the user's subscriptions. |
| `zulip.streams.topics.retrieve()` | GET `/users/me/<stream_id>/topics` | retrieves all the topics in a specific stream. |
| `zulip.typing.send()` | POST `/typing` | can be used to send a typing notification. The parameters required are `to` (either a username or a list of usernames) and `op` (either `start` or `stop`). |
| `zulip.users.retrieve()` | GET `/users` | retrieves all users for this realm. |
| `zulip.users.me.pointer.retrieve()` | GET `/users/me/pointer` | retrieves a pointer for a user. The pointer is the id of the last message the user read. This can then be used as an anchor message id for subsequent API calls. |
| `zulip.users.me.getProfile()` | GET `/users/me` | retrieves the profile of the user/bot. |
| `zulip.users.me.subscriptions()` | POST `/users/me/subscriptions` | subscribes a user to a stream/streams. |
| `zulip.users.create()` | POST `/users` | create a new user. |
| `zulip.users.me.subscriptions.remove()` | DELETE `/users/me/subscriptions` | remove subscriptions. |
| `zulip.users.me.pointer.update()` | POST `users/me/pointer` | updates the pointer for the user, for moving the home view. Accepts a message id. This has the side effect of marking some messages as read. Will not return success if the message id is invalid. Will always succeed if the id is less than the current value of the pointer (the id of the last message read). |
| `zulip.server.settings()` | GET `/server_settings` | returns a dictionary of server settings. |
# Testing

Use `npm test` to run the tests.

## Writing Tests

Currently, we have a simple testing framework which stubs our network
requests and also allows us to test the input passed to it. This is what
a sample test for an API endpoint looks like:

```js
const users = require('../../lib/resources/users'); // File to test.
const common = require('../common'); // Common functions for tests.

const chai = require('chai');
chai.use(require('chai-as-promised'));

chai.should();

describe('Users', () => {
  it('should fetch users', () => {
    const validator = (url, options) => { // Function to test the network request parameters.
      url.should.equal(`${common.config.apiURL}/users`);
      Object.keys(options.body.data).length.should.equal(4);
      options.body.data.subject.should.equal(params.subject);
      options.body.data.content.should.equal(params.content);
    };
    const output = { // The data returned by the API in JSON format.
      already_subscribed: {},
      result: 'success',
    };
    const stubs = common.getStubs(validator, output); // Stub the network modules.
    users(common.config).retrieve().should.eventually.have.property('result', 'success'); // Function call.
    common.restoreStubs(stubs); // Restore the stubs.
  });
});
```

Each pull request should contain relevant tests as well as example usage.

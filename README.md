# zulip-js
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

const zulip = require('zulip-js')(config);

zulip.streams.subscriptions().then(res => {
  console.log(res);
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

## Accounts
### Fetch API Key
`zulip.accounts.retrieve()` returns a promise that you can use to retrieve your `API key`.

```js
// After initializing the zulip object
zulip.accounts.retrieve().then(res => {
 console.log(res);
});
/* Prints
{ msg: '',
  api_key: 'your api key',
  result: 'success',
  email: 'your email address'
}
*/
```

## Streams
### Get All Streams
`zulip.streams.retrieve()` returns a promise that can be used to retrieve all streams.

```js
// After initializing the zulip object
zulip.streams.retrieve().then(res => {
  console.log(res);
});
/* Prints
{
  msg: '',
  result: 'success',
  streams: [
    ...
  ]
}
*/
```

### Get User's Subscribed Streams
`zulip.streams.subscriptions.retrieve()` returns a promise that can be used to retrieve the user's subscriptions.

```js
// After initializing the zulip object
zulip.streams.subscriptions.retrieve().then(res => {
  console.log(res);
});
/* Prints
{ msg: '',
  result: 'success',
  subscriptions: [
   ...
  ]
}
*/
```

## Messages
### Send a Messge
`zulip.messages.send()` returns a promise that can be used to send a message.

```js
// After initializing the zulip object
const params = {
  to: 'test-bot',
  type: 'stream',
  subject: 'Testing zulip-js',
  content: 'Something is wrong....'
};

// Send a message
zulip.messages.send(params).then(res => {
  // Response includes Message ID
  console.log(res);
});
```

### Read Messages from a Stream
`zulip.messages.retrieve()` returns a promise that can be used to retrieve messages from a stream. You need to specify the id of the message to be used as an anchor.

```js
const params = {
  stream: 'test-bot',
  type: 'stream',
  anchor: res.id,
  num_before: 1,
  num_after: 1,
};

// Fetch messages anchored around id (1 before, 1 after)
zulip.messages.retrieve(params).then(res => {
  // List of messages
  console.log(res.messages);
});
```

### Private Messages
#### Send a Private Message
Specify `type` to be `private` in the params object passed to `zulip.messages.send()`

```js
const params = {
  to: process.env.ZULIP_TEST_USERNAME,
  type: 'private',
  subject: 'Testing zulip-js',
  content: 'Something is wrong....'
};

zulip.messages.send(params).then(res => {
  console.log(res);
});
``` 

#### Checking Private Messages
Using a message's id as the `anchor`, add a `narrow` to the params passed to `zulip.messages.retrieve()`. The `narrow` is an array of objects, in this case just `{operator: 'is', operand: 'private'}`.

```js
const id = 'some message id';
const params = {
  anchor: id,
  narrow: [{
    operator: 'is',
    operand: 'private'
  }],
  num_before: 1,
  num_after: 1,
};
// Fetch messages anchored around id (1 before, 1 after)
zulip.messages.retrieve(params).then(res => {
  // List of messages
  console.log(res.messages);
});
```

## Queues
### Register a Queue
`zulip.queues.register()` registers a new queue. You can pass it a params object with the types of events you are interested in and whether you want to receive raw text or html (using markdown):

```js
{
  event_types: ['message', 'subscriptions', 'realm_user', 'pointer']
  apply_markdown: True
}
```

For example:

```js
// After initializing the zulip object
// Register queue to receive messages for user
const params = {
    event_types: ['message']
};

zulip.queues.register(params).then(res => {
  console.log(res);
  // Prints
  // { msg: '',
  //   max_message_id: 100375522,
  //   last_event_id: -1,
  //   result: 'success',
  //   queue_id: 'some queue id' }
});
```

## Events
### Retrieve Events from a Queue
`zulip.events.retrieve()` retrieves events from a queue. You can pass it a params object with the id of the queue you are interested in, the last event id that you have received and wish to acknowlege. You can also specify whether the server should not block on this request until there is a new event (the default is to block).

```js
{
  queue_id: 'the queue id',
  last_event_id: -1,
  dont_block: false
};


```

For example:

```js
// After initializing the zulip object
// Retrieve events from a queue
// Blocking until there is an event (or the request times out)
const params = {
  queue_id: 'your queue id',
  last_event_id: -1,
  dont_block: false
};

zulip.events.retrieve(params).then(res => {
  console.log(res);
  // Prints
  // { msg: '',
  //   result: 'success',
  //   handler_id: 2005928,
  //   events:
  //     [ { flags: [Object], message: [Object], type: 'message', id: 0 },
  //       { type: 'heartbeat', id: 1 },
  //       { flags: [], message: [Object], type: 'message', id: 2 },
  //       { flags: [], message: [Object], type: 'message', id: 3 },
  //       { flags: [], message: [Object], type: 'message', id: 4 } ] }
});
```

## Users
### Fetching all users (bots included)
`zulip.users.retrieve()` retrieves all users for this realm.

```js
zulip.users.retrieve({}).then(res => {
  console.log(res);
  //  Prints
  //  { msg: '',
  //    result: 'success',
  //    members:
  //    [ { is_bot: false,
  //        is_active: true,
  //        avatar_url: 'https://secure.gravatar.com/avatar/sfgsgsfsfh84785346gsfgsgf?d=identicon',
  //        is_admin: false,
  //        full_name: 'John Doe',
  //        email: 'john.doe@exmaple.com' },
  //   ...
});
```

## Realm Emojis
### Fetching Realm Emojis
`zulip.emojis.retrieve()` retrieves the list of realm specific emojis.

```js
zulip.emojis.retrieve().then(res => {
  console.log(res);
  //  Prints
  // { msg: '',
  //   result: 'success',
  //     emoji: {
  //       doge: {
  //         source_url: 'http://web.mit.edu/jesstess/www/doge.png',
  //         display_url: 'https://uploads.zulipusercontent.net/edc1569f7cb021b4877bc800019bef0960ed5b03/687474703a2f2f7765622e6d69742e6564752f6a657373746573732f7777772f646f67652e706e67'
  //       },
  //   ...
});
``` 

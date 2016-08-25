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
`zulip.messages.retrieve()` returns a promise that can be used to retrieve messages from a stream.

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

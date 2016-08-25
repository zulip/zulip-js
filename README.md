# zulip-js
Javascript library to access the Zulip API

# Usage
## Initialization
### With API Key
```
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

```
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

```
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

```
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

```
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

```
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

```
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

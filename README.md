# zulip-js
Javascript library to access the Zulip API

# Usage
```
const zulip = require('zulip-js');

zulip({
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM
}).then(zulip => {
  // The zulip object now contains the API Key
  zulip.accounts.retrieve()).then(res => {
    console.log(res);
  });
});
```

## API Keys
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

### Get Subscribed Streams
`zulip.streams.subscriptions()` returns a promise that can be used to retreive the user's subscriptions.

```
// After initializing the zulip object
zulip.streams.subscriptions().then(res => {
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

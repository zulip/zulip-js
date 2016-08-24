# zulip-js
Javascript library to access the Zulip API

# Usage
```
let zulip = require('zulip-js');
zulip = zulip({username: 'your zulip username', realm: 'your zulip realm', password: 'your zulip password'});
```

## API Keys
### Fetch API Key
`zulip.accounts.retrieve()` returns a promise that you can use to retrieve your `API key`. 

```
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

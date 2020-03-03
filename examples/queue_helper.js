const path = require('path');
const zulip = require('../lib');

const zuliprc = path.resolve('/path/to/your/zuliprc');

zulip({ zuliprc }).then((z) => {
  const handleEvent = async (event) => {
    console.log('Got Event:', event);
  };
  z.callOnEachEvent(handleEvent, ['message']);
});

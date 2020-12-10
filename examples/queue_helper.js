const path = require('path');
const zulip = require('../lib');

const zuliprc = path.resolve('/path/to/your/zuliprc');

(async () => {
  const z = await zulip({ zuliprc });
  const handleEvent = (event) => {
    console.log('Got Event:', event);
  };
  await z.callOnEachEvent(handleEvent, ['message']);
})();

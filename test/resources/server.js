const chai = require('chai');
const server = require('../../lib/resources/server');
const common = require('../common');

chai.should();

describe('Server', () => {
  it('should fetch server settings', async () => {
    const validator = (url, options) => {
      url.should.contain(`${common.config.apiURL}/server_settings`);
      options.should.not.have.property('body');
      options.method.should.be.equal('GET');
    };
    const output = {
      realm_name: 'Zulip Community',
      realm_icon: '/user_avatars/2/realm/icon.png?version=2',
      realm_description:
        '<p>Welcome to the Zulip development and user community!  </p>\n<p>Join to get a quick Zulip demo, observe a healthy Zulip community, offer feedback to the Zulip core team, or get involved in as a contributor.  </p>\n<ul>\n<li><a href="http://zulip.readthedocs.io/en/latest/chat-zulip-org.html" target="_blank" title="http://zulip.readthedocs.io/en/latest/chat-zulip-org.html">Community conventions</a></li>\n<li><a href="https://zulip.readthedocs.io/en/latest/code-of-conduct.html" target="_blank" title="https://zulip.readthedocs.io/en/latest/code-of-conduct.html">Code of Conduct</a></li>\n</ul>\n<p>Note that this server runs a bleeding-edge version of Zulip, so you may encounter bugs.  Please report them!</p>',
      require_email_format_usernames: true,
      result: 'success',
      authentication_methods: {
        password: true,
        ldap: false,
        remoteuser: false,
        dev: false,
        github: true,
        email: true,
        google: true,
      },
      zulip_version: '1.9.0-rc1+git',
      realm_uri: 'https://chat.zulip.org',
      email_auth_enabled: true,
      push_notifications_enabled: true,
      msg: '',
    };
    common.stubNetwork(validator, output);
    const data = await server(common.config).settings();
    data.should.have.property('result', 'success');
  });
});

var join = require('path').join, pfx = join(__dirname, './_certs/pfx.p12');

var apnagent = require('apnagent'), agent = module.exports = new apnagent.Agent();

agent
  .set('pfx file', pfx)
  .enable('sandbox');

agent.on('message:error', function (err, msg) {
  switch (err.name) {
    case 'GatewayNotificationError':
      console.log('[message:error] GatewayNotificationError: %s', err.message);
      if (err.code === 8) {
        console.log('    > %s', msg.device().toString());
      }

      break;

    case 'SerializationError':
      console.log('[message:error] SerializationError: %s', err.message);
      break;
    default:
      console.log('[message:error] other error: %s', err.message);
      break;
  }
});

agent.connect(function (err) {
  if (err && err.name === 'GatewayAuthorizationError') {
    console.log('Authentication Error: %s', err.message);
    process.exit(1);
  }

  else if (err) {
    throw err;
  }

  var env = agent.enabled('sandbox')
    ? 'sandbox'
    : 'production';

  console.log('apnagent [%s] gateway connected', env);
});

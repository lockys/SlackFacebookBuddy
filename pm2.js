/**
Author: Hao-Wei Jeng
**/
var pm2 = require('pm2');
var TIME = 1800000;
pm2.connect(function(err) {
  if (err) {
    throw new Error('pm2 connect error.');
  }

  // Re-start the instance every 30 minutes.
  setTimeout(startInstance, TIME);

});

function startInstance() {
  pm2.start('server.js', { name: 'slackbot' }, function(err, proc) {
    if (err) {
      throw new Error('Start Error');
    }
  });
}

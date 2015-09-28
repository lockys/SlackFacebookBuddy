/**
Author: Hao-Wei Jeng
**/
var pm2 = require('pm2');
var TIME = 3800000;
pm2.connect(function(err) {
  if (err) {
    throw new Error('pm2 connect error.');
  }
  // Re-start the instance every 30 minutes.
  restartInstance();
});

function restartInstance() {
  pm2.reload('slackbot', function(err, proc) {
    if (err) {
      throw new Error('Restart Error');
    }

    console.log('Restart!');
    setTimeout(restartInstance, TIME);
  });
}

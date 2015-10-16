var Buddy = require('../index');
var options = {
  account: {id: 'facebook_account', pwd: 'password'},
  router: {groupRouter: '/totest'},
  threadID: {groupID: 123355678},
  nameList: {
    lockys: 'HAO-WEI',
    buddy: 'Good Friend',
  },
};

var buddy = new Buddy(options);
buddy.login();
buddy.setRoute(options.router.test, options.threadID.totest);
buddy.startBot();
buddy.setLoginTimeOut();

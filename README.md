What is this?
==
[![NPM](https://nodei.co/npm/slack-facebook-buddy.png)](https://nodei.co/npm/slack-facebook-buddy/)  
A program that can transmit messenges in slack to Facebook.  
You can run this on [`c9.io`](http://c9.io)
![](https://dl.dropboxusercontent.com/u/16975922/capture.gif)

## Getting started
**Create bot account**  
1. Register a new facebook account as robot.   
2. Add robot you created to an exsisting chatroom, get `thread_id` of that chatroom on the url by clicking `Option->See Full Conversation`.  
The URL will like this -> `https://www.facebook.com/messages/conversation-<thread_id>`  
3. Record the `thread_id` as we will need it after.

**Installation on your server**  
```shell
$ npm i slack-facebook-buddy
```

**An example**
```javascript
// index.js
var Buddy = require('slack-facebook-buddy');
var options = {
  account: {id: 'facebook_account', pwd: 'password'},
  router: {groupRouter: '/totest', group2Router: '/totest2'},
  threadID: {groupID: 123355678, group2ID: 123444444},
  nameList: {
    lockys: 'HAO-WEI',
    buddy: 'Good Friend',
  },
  delimeter: 'fb=', // Note that delimeter must equals to trigger word.
};

var buddy = new Buddy(options);
// login your bots!
buddy.login();
// You can set different routes for different channels and
// send messenges in slack to a specified chatroom(base on thread_id)
buddy.setRoute(options.router.groupRouter, options.threadID.groupID);
buddy.setRoute(options.router.group2Router, options.threadID.group2ID);
// start the bot.
buddy.startBot();
// re-login every 1 hr.
buddy.setLoginTimeOut(3600000);
```
**About `options` variable**  
`account` Your robot's account and password.    
`router` Specify router so that slack could post request to your `post url`.    
`threadID` Every chatroom will have a thread id.  
`nameList` A slack-id to facebook name mapping so that people in chatroom could know who is talking.

**Run bot!**  
(Optional) You can use `pm2` module to manage process.
```shell
$ pm2 start index.js
# or just
$ node index.js
```
**You need to configure channel setting of Slack to make bot receive post req from Slack**  
1. Open out-going webhook setting of your channel in integration panel.  
2. Set `fb=` as trigger word.  
3. Set your server's `post url` in url field.  
An example of `post url` according to your host: `http://example.io/totest`
![](https://dl.dropboxusercontent.com/u/16975922/instruction.gif)

LICENSE
==
![](https://img.shields.io/dub/l/vibe-d.svg)

What is this?
==
A program that can transmit messenges in slack to Facebook.  
You can run this on [`c9.io`](http://c9.io)
![](https://dl.dropboxusercontent.com/u/16975922/capture.gif)

## Getting started

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
**options**  
`account` Your robot's account and password.    
`router` Specify router so that slack could post request to your `post url`.    
`threadID` Every chatroom will have a thread id.  
`nameList` A slack-id to facebook name mapping so that people in chatroom could know who is talking.

**You need to configure channel setting of Slack**  
1. Register a new facebook account as robot.   
2. Create a facebook chatroom and add robot you created to this chatroom, get `thread_id` on the url by clicking `Option->See Full Conversation`.  
The URL will like this -> `https://www.facebook.com/messages/conversation-<thread_id>`  
3. Set outgoing webhook with trigger word `fb=` and your server's `post url` in your channel setting.
An example of `post url` according to your host:
`http://example.io/totest`

LICENSE
==
![](https://img.shields.io/dub/l/vibe-d.svg)

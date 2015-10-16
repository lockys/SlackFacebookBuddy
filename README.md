What is this?
==
A program that can transmit messenges of slack to Facebook.  
You can run this on [`c9.io`](http://c9.io)
![](https://dl.dropboxusercontent.com/u/16975922/capture.gif)
##Getting started
**Configure channel of Slack**  
1. Register a new facebook account as robot.   
2. Create a facebook chatroom and add robot you created to this chatroom, get `thread_id` on the url by clicking `Option->See Full Conversation`.  
The URL will like this -> `https://www.facebook.com/messages/conversation-<thread_id>`  
3. Set outgoing webhook with trigger word `fb=` and your server's `post url` in your channel setting.
An example of `post url` according to your host:
`http://example.io/toAll`

**Installation on your server**  
```shell
$ npm i slack-facebook-buddy
```

**An example**
```javascript
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
buddy.login();
buddy.setRoute(options.router.groupRouter, options.threadID.groupID);
buddy.setRoute(options.router.group2Router, options.threadID.group2ID);
buddy.startBot();
buddy.setLoginTimeOut(3600000); // re-login every 1 hr.
```
**Options**  
`account` Your robot's account and password.    
`router` Specify router so that slack could post request to your `post url`.    
`threadID` Every chatroom will have a thread id.  
`nameList` A slack-id to facebook name mapping so that people in chatroom could know who is talking.

LICENSE
==
![](https://img.shields.io/dub/l/vibe-d.svg)

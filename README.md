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
$ npm install
$ pm2 start index.js --name slack-to-facebook # Use pm2 to manage process.
$ node pm2.js # restart server every 1hr (optional)
```

##Set up credential.js
```javascript
module.exports = {
  account: {id: 'facebook-account', pwd: 'password',},
  router: {toAll: '/toAll', toOffice: '/toOffice'},
  threadID: {allGroup: allThreadID(Number), officeGroup: groupThreadID(Number)},
  nameList: {
    'slackbot': 'display-name-in-facebook',
    'lockys': 'Calvin Jeng',
  },
};
```
`account` Your robot's account and password.    
`router` Specify router so that slack could post request to your `post url`.    
`threadID` Every chatroom will have a thread id.  
`nameList` A slack-id to facebook name mapping so that people in chatroom could know who is talking.

**An example of router**
```javascript
router.post(credential.router.toAll, function(req, res) {
  var slackBody = req.body;
  var user = slackBody.user_name;
  var text = slackBody.text;

  console.log(user, text);
  user = credential.nameList[user] || user;
  var groupThreadID = credential.threadID.allGroup;
  var msg = {body: user + ' says: ' + text.replace(delimeter , '')};

  if (user !== 'slackbot') {
    apiInstance.sendMessage(msg, groupThreadID);
  }
});
```
Replace `credential.router.toAll` and `credential.threadID.allGroup` base on your credential.js file. 
LICENSE
==
![](https://img.shields.io/dub/l/vibe-d.svg)

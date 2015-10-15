What is this?
==
A program that can transmit messenges of slack to Facebook.

**Set up credential.js**
```javascript
module.exports = {
  account: {id: 'facebook-account', pwd: 'password',},
  router: {toAll: '/toAll', toOffice: '/toOffice'},
  threadID: {officeGroup: groupThreadID(Number), allGroup: allThreadID(Number)},
  nameList: {
    'slackbot': 'display-name-in-facebook',
    'lockys': 'Calvin Jeng',
  },
};
```

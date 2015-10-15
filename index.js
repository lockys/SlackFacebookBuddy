var http = require('http');
var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var login = require('facebook-chat-api');
var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));

server.listen(process.env.PORT || 8000, process.env.IP || '0.0.0.0', function() {
  var addr = server.address();
  console.log('slack-to-fb bot server listening at', addr.address + ':' + addr.port);
});

router.use(bodyParser.urlencoded());
var credential = require('./credential');
var apiInstance;

//trigger keyword
var delimeter = 'fb=';

login({email: credential.account.id, password: credential.account.pwd}, function(err, api) {
  if (err) {
    return console.error(err);
  }

  apiInstance = api;
});

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

router.post(credential.router.toOffice, function(req, res) {
  var slackBody = req.body;
  var user = slackBody.user_name;
  var text = slackBody.text;

  console.log(user, text);
  user = credential.nameList[user] || user;
  var groupThreadID = credential.threadID.officeGroup;
  var msg = {body: user + ' says: ' + text.replace(delimeter , '')};

  if (user !== 'slackbot') {
    apiInstance.sendMessage(msg, groupThreadID);
  }
});

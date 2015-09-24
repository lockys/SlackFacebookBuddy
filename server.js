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
var config = require('./credential');
var apiInstance;

login({email: config.account.id, password: config.account.pwd}, function(err, api) {
  if (err) {
    return console.error(err);
  }

  apiInstance = api;
});

router.post(credential.router.tosip, function(req, res) {
  var slackBody = req.body;
  var user = slackBody.user_name;
  var text = slackBody.text;

  console.log(user, text);

  var sipThreadID = credential.threadID.sip;
  var msg = {body: user + ' 說: ' + text};

  if (user !== 'slackbot') {
    apiInstance.sendMessage(msg, sipThreadID);
  }
});

router.post(credential.router.lab, function(req, res) {
  var slackBody = req.body;
  var user = slackBody.user_name;
  var text = slackBody.text;

  console.log(user, text);

  var labThreadID = credential.threadID.lab;
  var msg = {body: user + ' 說: ' + text};

  if (user !== 'slackbot') {
    apiInstance.sendMessage(msg, labThreadID);
  }
});

router.post(credential.router.toall, function(req, res) {
  var slackBody = req.body;
  var user = slackBody.user_name;
  var text = slackBody.text;

  console.log(user, text);

  var allThreadID = credential.threadID.toall;
  var msg = {body: user + ' 說: ' + text};

  if (user !== 'slackbot') {
    apiInstance.sendMessage(msg, allThreadID);
  }
});

router.post(credential.router.totest, function(req, res) {
  var slackBody = req.body;
  var user = slackBody.user_name;
  var text = slackBody.text;

  console.log(user, text);

  var allThreadID = credential.threadID.toall;
  var msg = {body: user + ' 說: ' + text};

  if (user !== 'slackbot') {
    apiInstance.sendMessage(msg, allThreadID);
  }
});
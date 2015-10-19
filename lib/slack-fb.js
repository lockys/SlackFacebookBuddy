module.exports = SlackFacebookBuddy;

function SlackFacebookBuddy(options) {
  var _this = this;
  var bodyParser = require('body-parser');
  var express = require('express');

  _this.options = options || {};
  _this.fbLoginInstance = null;
  _this.delimeter = options.delimeter || 'fb=';
  _this.nameList = options.nameList || {};
  _this.router = express();
  _this.router.use(bodyParser.urlencoded());
}

SlackFacebookBuddy.prototype.login = function() {
  var _this = this;
  var login = require('facebook-chat-api');

  login({email: _this.options.account.id, password: _this.options.account.pwd}, function(err, api) {
    if (err) {
      return console.error(err);
    }

    _this.fbLoginInstance = api;
  });
};

SlackFacebookBuddy.prototype.setRoute = function(route, threadID) {
  var _this = this;
  var sender = function(req, res) {
    var slackBody = req.body;
    var user = slackBody.user_name;
    var text = slackBody.text.replace(_this.delimeter , '');

    user = _this.nameList[user] || user;
    var msg = {body: user + ' says: ' + text};

    if (user !== 'slackbot') {
      _this.fbLoginInstance.sendMessage(msg, threadID);
    }
  };

  _this.router.post(route, sender);
};

SlackFacebookBuddy.prototype.startBot = function() {
  var http = require('http');
  var server = http.createServer(this.router);

  server.listen(process.env.PORT || 8000, process.env.IP || '0.0.0.0', function() {
    var addr = server.address();
    console.log('Bot server is running at', addr.address + ':' + addr.port);
  });

};

SlackFacebookBuddy.prototype.setLoginTimeOut = function(timer) {
  var TIME = timer || 3800000;
  var _this = this;

  setTimeout(reLoginFacebook, TIME);
  function reLoginFacebook() {
    _this.login();
    setTimeout(reLoginFacebook, TIME);
  }
};

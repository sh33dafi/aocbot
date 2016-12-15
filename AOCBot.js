'use strict';

const util = require('util');
const Bot = require('slackbots');

class AocBot {

  constructor(settings) {
    this.settings = settings;
  }

  run(cb) {
    AocBot.super_.call(this, this.settings);
    this.on('start', cb);
    this.on('message', (message) => {
      if (message.type === 'message' && message.text.includes(`<@${this.settings.id}>`)) {
        this.onMention(message);
      }
    });
    this.getUsers().then(resp => {
      this.users = resp.members
    });
  }

  postToAocChannel(message) {
    //this.postMessageToChannel("adventofcode", message, {icon_emoji: ":santa:"});
    console.log(message)
  }

  onMention(message) {
    let response = "What?";
    if (message.text.includes("show me the leaders")) {
      response = "sup?";
    }
    let user = this.users.find(u => u.id === message.user);
    this.postMessageToUser(user.name, response, {icon_emoji: ":santa:"});
  }

}

// inherits methods and properties from the Bot constructor
util.inherits(AocBot, Bot);

module.exports = AocBot;

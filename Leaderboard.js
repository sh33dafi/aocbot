const restify = require('restify');
const _ = require('lodash');

class Leaderboard {
  constructor(session, board) {
    this.board = board;
    this.client = restify.createJsonClient({
      url: 'http://adventofcode.com',
      headers: {
        "Cookie": `session=${session}`
      }
    });
  }

  getLeaders(cb) {
    this.client.get(`/2016/leaderboard/private/view/${this.board}.json`, (err, req, res, obj) => {
      if (!err) {
        const leaders = _.values(obj.members)
          .sort((a,b) => b.stars - a.stars )
          .map(member => `${member.name} (${member.stars})`).join("\n");
        cb(leaders);
      }
    });
  }
}

module.exports = Leaderboard;

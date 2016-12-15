const restify = require('restify');
const _ = require('lodash');
const fs = require('fs');

class Leaderboard {
  constructor(session, board) {
    this.prefLeaderBoard = "";

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
          .sort((a,b) => b.local_score - a.local_score )
          .map(member => {
            return {
              name: member.name,
              stars: member.stars,
              id: member.id,
              progress: " "
            }
          });

          this.retrieveLeaders((err, prev) => {
            if (prev) {
              console.log("ksjld");
              Leaderboard.indicateMovement(leaders, prev);
            }

            if (this.prefLeaderBoard !== leaders) {
              this.prefLeaderBoard = leaders;
              cb(leaders);
            }

            this.storeLeaders(leaders);
          });

      }
    });
  }

  retrieveLeaders(cb) {
    fs.readFile("leaders.json", 'utf8', function(err, contents) {
      if (!err) {
        cb(null, JSON.parse(contents))
      } else {
        cb(err);
      }

    });
  }

  storeLeaders(leaders) {
      const data = leaders.map(p => p.id);
      fs.writeFile("leaders.json", JSON.stringify(data));
  }

  static indicateMovement(currentLeaders, prevLeaders) {
    let i = 0;
    for (let c of currentLeaders) {
      const prevIndex = _.findIndex(prevLeaders, (l) => l == c.id);
      if (prevIndex === i++) {
        c.progress = " "; //EQ
      } else if (prevIndex < 0 || i < prevIndex){
        c.progress = "\u25B2"; //UP
      } else {
        c.progress = "\u25BE"; // DOWN
      }
    }
  }
}

module.exports = Leaderboard;

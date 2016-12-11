require('dotenv').config({silent: true});

const AOCBot = require('./AOCBot');
const LeaderBoard = require('./Leaderboard');

var token = process.env.SLACK_KEY;
var botId = process.env.BOT_ID;

var aocBot = new AOCBot({
    token: token,
    id: botId,
    name: "AOCBot"
});

var leaderboard = new LeaderBoard(process.env.AOC_SESSION, process.env.AOC_LEADERBOARD);

aocBot.run(() => {
  const delay = 1000 * 60* 60;
  leaderboard.getLeaders((leaders) => aocBot.postToAocChannel(`This is the current leaderboard:
${leaders}`));
  setInterval(() => {
    leaderboard.getLeaders((leaders) => aocBot.postToAocChannel(`This is the current leaderboard:
  ${leaders}`));
  }, delay);
});

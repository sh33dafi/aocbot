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
  const delay = 1000 * 60 * 15;
  const postMessage = (leaders) => aocBot.postToAocChannel(`This is the new leaderboard:
${leaders}`);
  leaderboard.getLeaders(postMessage);
  setInterval(() => {
    leaderboard.getLeaders(postMessage);
  }, delay);
});

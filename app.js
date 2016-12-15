require('dotenv').config({silent: true});

const AOCBot = require('./AOCBot');
const LeaderBoard = require('./Leaderboard');
const fs = require('fs');
var token = process.env.SLACK_KEY;
var botId = process.env.BOT_ID;

var aocBot = new AOCBot({
    token: token,
    id: botId,
    name: "AOCBot"
});

var leaderboard = new LeaderBoard(process.env.AOC_SESSION, process.env.AOC_LEADERBOARD);



function postMessage(leaders) {
  const msg = leaders.map(person => `${person.progress} ${person.name} (${person.stars})`).join("\n")
  aocBot.postToAocChannel(`This is the new leaderboard:\n${msg}`);
}

aocBot.run(() => {
  const delay = 1000 * 60 * 15;
  leaderboard.getLeaders(postMessage);
  setInterval(() => {
    leaderboard.getLeaders(postMessage);
  }, delay);
});

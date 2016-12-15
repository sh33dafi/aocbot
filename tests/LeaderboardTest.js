const LeaderBoard = require('../Leaderboard');
const assert = require("assert");

let currentLeaders = [ { id: '1' },
  { id: '2' },
  { id: '3' } ];
let prevLeaders = [ '1',
  '2',
  '3'];

LeaderBoard.indicateMovement(currentLeaders, prevLeaders);

assert.deepEqual(currentLeaders.map(p => p.progress), [" ", " ", " "]);

// NEW PERSON ON LAST PLACE
currentLeaders = [ { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' } ];
prevLeaders = [ '1',
  '2',
  '3'];

LeaderBoard.indicateMovement(currentLeaders, prevLeaders);

assert.deepEqual(currentLeaders.map(p => p.progress), [' ', ' ', ' ', '▲' ]);

// PERSON UP AND DOWN
currentLeaders = [ { id: '3' },
  { id: '2' },
  { id: '1' } ];
prevLeaders = [ '1',
  '2',
  '3'];

LeaderBoard.indicateMovement(currentLeaders, prevLeaders);

assert.deepEqual(currentLeaders.map(p => p.progress), [ '▲', ' ', '▾' ]);

// NEW PERSON ON FIRST PLACE
currentLeaders = [ { id: '4' },
  { id: '1' },
  { id: '2' },
  { id: '3' } ];
prevLeaders = [ '1',
  '2',
  '3'];
LeaderBoard.indicateMovement(currentLeaders, prevLeaders);

assert.deepEqual(currentLeaders.map(p => p.progress), [ '▲', '▾', '▾', '▾' ]);
console.log("===");
// NEW PERSON AND CHANGES PLACE
currentLeaders = [ { id: '4' },
  { id: '5' },
  { id: '2' },
  { id: '3' },
  { id: '1' } ];
prevLeaders = [ '1',
  '2',
  '3',
  '4'];
LeaderBoard.indicateMovement(currentLeaders, prevLeaders);

assert.deepEqual(currentLeaders.map(p => p.progress), ['▲', '▲', '▾', '▾', '▾']);

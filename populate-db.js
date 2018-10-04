const pg = require('pg');
const jsonfile = require('jsonfile');

const configs = {
  user: 'chanleyou',
  host: '127.0.0.1',
  database: 'nba_stats',
  port: 5432,
};

const client = new pg.Client(configs);

client.connect((err) => {

  jsonfile.readFile('players.json', (err, obj) => {
    if (err) console.error(err);

    let players = obj.players;

    for (let i in players) {

      let command = "INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5);";

      let values = [
        players[i].name,
        players[i].age,
        players[i].team,
        players[i].age,
        players[i].points
      ];

      client.query(command, values, (err, res) => {
        if (err) {
          console.log("Error: ", err);
        } else {
          console.log("Result: " + res.rows);
        }
      })
    }
  })

  // let knicks = "SELECT * FROM players WHERE team = 'NYK';";
  // let packersUnder26 = "SELECT * FROM players WHERE team = 'IND' AND age < 26;";
  // let pointsAscending = "SELECT * FROM players ORDER BY points ASC;";
  // let oldMelo = "SELECT * FROM players WHERE team = 'NYK' AND points > 1000;";
  // let bullsUnder300 = "SELECT * FROM players WHERE team = 'CHI' AND points < 300;";
  // let teamsUnder2appg ="SELECT team from players WHERE points/games < 2;";
  // let avgAge = "SELECT AVG(age) FROM players;";
  //
  // let stringArray = [knicks, packersUnder26, pointsAscending, oldMelo, bullsUnder300, teamsUnder2appg, avgAge];
  //
  // for (let i in stringArray) {
  //   client.query(stringArray[i], (err, res) => {
  //     if (err) {
  //       console.log("Error: ", err);
  //     } else {
  //       console.log(stringArray[i]);
  //       console.log(res.rows);
  //       console.log(i);
  //     }
  //   })
  // }

})

const db = require("../connectDB/DB");

async function upDateData(req, res) {
  let idToUpdate = req.body.id;
  let addressRenter = req.body.addressRenter;
  let type = req.body.type;
  db.query(
    `update maps.countriesData set addressRenter = ${addressRenter}, type=${type} where id = ${idToUpdate}  `,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
      // return console.log(res);
    }
  );
}

function getData(req, res) {
  db.query(
    `select * from maps.countriesData INNER JOIN maps.polygonsmaps ON polygonsmaps.locationId=countriesData.id  `,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
      // return console.log(res);
    }
  );

  // res.send('Hello World');
}


async function upDateScore(req, res) {
  let scoreUpDate = req.body.scrollUpDate;
  db.query(
    `update maps.gameSnake set gameSnakeScore = ${scoreUpDate} where id = 1  `,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    }
  );
}

async function getScore(req, res) {
  db.query(`SELECT gameSnakeScore FROM maps.gameSnake `, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
}
module.exports = {
  upDateData,
  getData,
  upDateScore,
  getScore
};

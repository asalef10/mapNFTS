// const mysql = require("mysql");
// const data = require("../client/src/data");
// var async = require("async");

// const db = mysql.createConnection({
//   host: "209.250.225.186",
//   user: "asalef2",
//   password: "asalef1010",
//   database: "maps",
// });

// function deleteItemInTable(length) {
//   db.connect(async function (err) {
//     if (err) throw err;
//     for (let i = 0; i < length; i++) {
//       var sql = `DELETE FROM maps.countriesData WHERE id = ?`;
//       await db.query(sql, i, (error, result, fields) => {
//         if (err) throw err;
//         console.log("Number of records deleted: " + result.affectedRows);
//       });
//     }
//   });
// }
// function createTable() {
//   // db.connect(function (err) {
//   //   if (err) {
//   //     return console.error("error: " + err.message);
//   //   }
//   //   console.log("Connected to the MySQL server.");
//   // });
//   // db.query(`select * from maps.countriesData`, (err, res) => {
//   //   return console.log(res);
//   // });
//   //  db.connect(function(err) {
//   //   if (err) throw err;
//   //   console.log("Connected!");
//   //   let sql = "CREATE TABLE countries (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), type BOOLEAN,addressRenter VARCHAR(255))";
//   //   db.query(sql, function (err, result) {
//   //     if (err) throw err;
//   //     console.log("Table created");
//   //   });
// }

// class LocationsData {
//   constructor(name, array, id) {
//     this.name = name;
//     this.array = array;
//     this.id = id;
//   }
// }
// let array = [];
// async function insertToTable() {
//   let arrayN = [];
//   let lat;
//   let lon;
//   let id;
//   let sql = "INSERT INTO maps.polygonsmaps (lat,lon,locationId) VALUES ?";

//   for (let i = 0; i < data.statesData.features.length; i++) {
//     let coordinates = data.statesData.features[i].geometry.coordinates;

//     xy = coordinates.flat(Infinity);
//     let Country = new LocationsData(
//       data.statesData.features[i].properties.name,
//       xy,
//       data.statesData.features[i].id
//     );

//     arrayN.push(Country);
//   }

//   let array = [];

//   async function insertedAs() {
//     let arrayClass;
//     for (let i = 0; i < arrayN.length; i++) {
//       arrayClass = arrayN[i].array;
//       id = arrayN[i].id;
//       for (let j = 0; j < arrayClass.length; j++) {
//         if (j % 2 === 0) {
//           console.log(id);
//           lat = arrayClass[j];
//           lon = arrayClass[j + 1];
//           let detailsLocation = [[lat, lon, id]];
//           // console.log(detailsLocation);

//           let arrayOfPromises = db.query(
//             sql,
//             [detailsLocation],
//             async function (err, result) {
//               array.push(arrayOfPromises);
//               await Promise.all(array);
//               if (err) {
//               } else {
//                 console.log(
//                   "Number of records inserted: " + result.affectedRows
//                 );
//               }
//             }
//           );
//         }
//       }
//     }
//   }

//   insertedAs();
// }

// // for (let i = 0; i < data.statesData.features.length; i++) {
// // console.log(data.statesData.features[i].geometry.coordinates.length)
// // }
// // createTable();
// // insertCountry();
// insertToTable().then((x)=>{x});
// // deleteItemInTable(80)

// function insertCountry() {
    //   let sql = "INSERT INTO maps.polygonsmaps (lat,lon,locationId) VALUES ?";

//   let sql = "INSERT INTO maps.countriesData (id,name,type) VALUES ?";
//   let array = [];
//   for (let i = 0; i < data.statesData.features.length; i++) {
//     let name = data.statesData.features[i].properties.name;
//     let id = data.statesData.features[i].id;
//     let type = data.statesData.features[i].type;
//     let detailsLocation = [[id, name, type]];

//     let arrayOfPromises = db.query(
//       sql,
//       [detailsLocation],
//       async function (err, result) {
//         array.push(arrayOfPromises);
//         await Promise.all(array);
//         if (err) {
//         } else {
//           console.log("Number of records inserted: " + result.affectedRows);
//         }
//       }
//     );
//   }
// }

// function connectAndCallTable() {
//   const { createPool } = require("mysql");
//   const pool = createPool({
//     host: "209.250.225.186",
//     user: "asalef2",
//     password: "asalef1010",
//     database: "maps",
//   });
//   pool.query(`select * from maps.locations`, (err, res) => {
//     return console.log(res);
//   });
// }

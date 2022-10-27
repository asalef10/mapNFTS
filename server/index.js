const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mysql = require("mysql");
const data = require("../client/src/data");
const cors = require("cors");
const mapsRouting = require("../server/rauting/mapsRauting");
const db = require("../server/connectDB/DB");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", mapsRouting);
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("work");
});

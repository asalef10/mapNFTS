const mapsRouting = require("express").Router();
const mapsControllers = require("../controllers/mapsControllers");
mapsRouting.post("/upDateData", mapsControllers.upDateData);
mapsRouting.post("/upDateScore", mapsControllers.upDateScore);
mapsRouting.get("/getData", mapsControllers.getData);
mapsRouting.get("/getScore", mapsControllers.getScore);
module.exports = mapsRouting;

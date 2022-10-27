var fs = require("fs");
let data = require("../client/src/data");
async function createFile(req, res) {
  for (let i = 0; i < data.statesData.features.length; i++) {
    let jsonName = "allNameLocations";
    let jsonData = JSON.stringify(data.statesData.features[i].properties.name);
    console.log(jsonData);

    let jsonObj = JSON.parse(jsonData);
    console.log(jsonObj);

    let jsonContent = JSON.stringify(jsonObj);
    console.log(jsonContent);

    fs.writeFile(`${jsonName}.json`, jsonContent, "utf8", function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");
    });
  }
}
createFile().then(() => {
  console.log("done");
});

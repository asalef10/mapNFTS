var fs = require('fs');
var Stream = require('stream')
var data = require('../client/src/data')
async function createFile(req,res){
  // file system module to perform file operations
//  console.log(data);
// json data
for (let i = 0; i < data.statesData.features.length; i++) {
    
    var jsonName = "allNameLocations"
    var jsonData = JSON.stringify(data.statesData.features[i].properties.name);
    console.log(jsonData);
    
// parse json
var jsonObj = JSON.parse(jsonData);
console.log(jsonObj);

// stringify JSON Object
var jsonContent = JSON.stringify(jsonObj);
console.log(jsonContent);

fs.writeFile(`${jsonName}.json`, jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    
    console.log("JSON file has been saved.");
});
}
}
createFile().then(()=>{console.log("done");})
// var fs = require('fs');
// var Stream = require('stream')
// var data = require('../src/data')
// async function createFile(req,res){
//   // file system module to perform file operations
// //  console.log(data);
// // json data
// for (let i = 0; i < data.statesData.features.length; i++) {
    
//     var jsonName = data.statesData.features[i].properties.name
//     var jsonData = JSON.stringify(data.statesData.features[i]);
//     console.log(jsonData);
    
// // parse json
// var jsonObj = JSON.parse(jsonData);
// console.log(jsonObj);

// // stringify JSON Object
// var jsonContent = JSON.stringify(jsonObj);
// console.log(jsonContent);

// fs.writeFile(`${jsonName}.json`, jsonContent, 'utf8', function (err) {
//     if (err) {
//         console.log("An error occured while writing JSON Object to File.");
//         return console.log(err);
//     }
    
//     console.log("JSON file has been saved.");
// });
// }
// }
// createFile().then(()=>{console.log("done");})
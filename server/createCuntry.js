const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mapsJSON = require("../client/src/Artifacts/mapsABI.json");
const fs = require("fs");
const { statesData } = require("../client/src/data");
// import statesData from ('./src/data')

var provider = new HDWalletProvider(
  process.env.KEY,
  "https://matic-mumbai.chainstacklabs.com"
);

const web3 = new Web3(provider);

async function work() {
  const useMap = new web3.eth.Contract(
    mapsJSON.abi,
    "0x4A8F1634Fe8c8c428C10f743F40c0039260e3C86"
  );

  const accounts = await web3.eth.getAccounts();

  console.log("account " + accounts[0]);
  try {
    statesData.features.map(async (data, i) => {
      let location;
      data.geometry.coordinates.map((locations) => {
        location = "" + locations;
        // console.log("" +  locations);
      });
      let longitudeParameter = data.geometry.coordinates;
      // console.log(longitudeParameter);
      // console.log(location);
      var createCountry = await useMap.methods
        .createCountries(data.type, data.properties.name, location, false)
        .send({ from: accounts[0] });
      let x = 0;
      x + 1;
      console.log("up " + i);
    });
    // console.log(x);
    // var createCountry = await blinkIt.methods
    //   .createCountries('try', 'zero', 'tryCountry', x, y, false)
    //   .send({ from: accounts[0] });

    // var Countries = await blinkIt.methods.Countries(0).call();
    // console.log(Countries);

    // var estimateGas = await blinkIt.methods
    //   .createCountries(
    //     'country',
    //     statesData[i].features.id,
    //     statesData[i].name,
    //     [8, 2]
    //   )
    //   .estimateGas();
    // console.log('estimateGas: ' + estimateGas);
  } catch (error) {
    console.log(error);
  }
}

//   for (let i = 0; i < files.length; i++) {
//     try {
//       var estimateGas = await blinkIt.methods
//         .createCountries()
//         .estimateGas();

//       console.log("estimateGas: " + estimateGas);

//       var tx = await blinkIt.methods
//         .createNFT("https://nft.blinkit.co.il/images/" + files[i])
//         .send({ from: accounts[0], gas: estimateGas, gasPrice: "40000000000" });
//     } catch (ex) {
//       console.log(ex);
//     }
//     console.log(`nft ${i} created`);

//     console.log("https://nft.blinkit.co.il/images/" + files[i]);
//   }

//   //get NFT file path
//   // const tokenURI = await blinkIt.methods.getTokenURI(42).call();
//   // console.log(tokenURI);

work().then((f) => {
  console.log("e");
});

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

async function createCounter() {
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
      });

      await useMap.methods
        .createCountries(data.type, data.properties.name, location, false)
        .send({ from: accounts[0] });
      let x = 0;
      x + 1;
      console.log("up " + i);
    });
  } catch (error) {
    console.log(error);
  }
}

createCounter()

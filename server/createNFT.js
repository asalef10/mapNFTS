const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mapsJSON = require("../client/src/Artifacts/mapsABI.json");
const fs = require("fs");
// const mapsAJson = require("../server/mapsJSON");

// C:\Users\Asalef alena\Desktop\project whit smart contract\mapsNFT\maspNFT\server\mapsJSON
var provider = new HDWalletProvider(
  process.env.KEY,
  "https://matic-mumbai.chainstacklabs.com"
);

const web3 = new Web3(provider);

async function work() {
  const maps = new web3.eth.Contract(
    mapsJSON.abi,
    "0x20314461b719Fa306CA21D1659fF99fe3C648D04"
  );

  const accounts = await web3.eth.getAccounts();
  //   maspNFT\server\mapsJSON
  const mapsAJson = "../server/mapsJSON";
  let files = fs.readdirSync(mapsAJson);
  console.log("account " + accounts[0]);
  console.log(files[0]);

  for (let i = 0; i < files.length; i++) {
    try {
      var tx = await maps.methods
        .createNFT("http://209.250.225.186/" + files[i])
        .send({ from: accounts[0] });
    } catch (ex) {
      console.log(ex);
    }
    console.log(`nft ${files[i]} ,  ${i} created`);

    console.log("http://209.250.225.186/" + files[i]);
  }

  //   get NFT file path
 
}

work().then((f) => {
  console.log("e");
});

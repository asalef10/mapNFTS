import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
const mapsABI = require("../Artifacts/mapsABI.json");
const useMaps = () => {
  const web3 = new Web3(window.ethereum);
  const { account } = useWeb3React();
  let mapsNFT = new web3.eth.Contract(
    mapsABI.abi,
    "0x20314461b719Fa306CA21D1659fF99fe3C648D04"
  );

  async function allLocationData(num) {
    const LocationData = mapsNFT.methods.listMaps(num).call();
    return LocationData;
  }
  async function lengthMaps() {
    const numCountries = mapsNFT.methods.numCountries().call();
    return numCountries;
  }
  async function buyLocations(num) {
    try {
      if (account) {
        console.log(account);
        const PurchasingLocation = mapsNFT.methods
          .buyLocations(num)
          .send({ from: account });
        return PurchasingLocation;
      } else {
        alert("you need connect metaMask");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function releaseLocation(num) {
    const releaseLocation = mapsNFT.methods
      .releaseLocation(num)
      .send({ from: account });
    return releaseLocation;
  }
  async function locationIdIsCath(num) {
    account = await web3.eth.getAccounts();

    const locationIdIsCath = mapsNFT.methods.locationIdIsCath(num).call();
    return locationIdIsCath;
  }
  return {
    allLocationData,
    lengthMaps,
    buyLocations,
    releaseLocation,
    locationIdIsCath,
  };
};
export default useMaps;

const Migrations = artifacts.require("NFTmaps");

module.exports = function (deployer) {
  deployer.deploy(NFTmaps);
};

const MyMotors = artifacts.require("MyMotors");

module.exports = function (deployer) {
  deployer.deploy(MyMotors);
};
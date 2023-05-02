const { Utils } = require("alchemy-sdk");

async function estimateGasOfTx(fromContractAddress, toContractAddress, nftContractData, alchemy) {
  const estimatedGasCostInHex = await alchemy.core.estimateGas({
    from: fromContractAddress,
    to: toContractAddress,
    data: nftContractData
  });

  console.log(
    "The gas cost estimation for the above tx is: " +
      Utils.formatUnits(estimatedGasCostInHex, "gwei") +
      " gwei"
  );
}

async function getCurrentGas(alchemy) {
  const currentGasInHex = await alchemy.core.getGasPrice();

  console.log(
    "The current gas cost on the network is: " +
      Utils.formatUnits(currentGasInHex, "gwei") +
      " gwei"
  );
}

module.exports = {
    estimateGasOfTx,
    getCurrentGas
};

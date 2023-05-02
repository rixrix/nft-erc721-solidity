const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
});

const { Alchemy, Network } = require("alchemy-sdk");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const nftContractABI = require("../artifacts/contracts/NFT.sol/NFT.json");
const { estimateGasOfTx, getCurrentGas } = require("./utils");

const {
  ALCHEMY_API_KEY,
  ALCHEMY_API_URL,
  RIXTOKEN_CONTRACT_ADDRESS,
  METAMASK_PRIVATE_KEY,
  METAMASK_PUBLIC_KEY,
} = process.env;

const web3 = createAlchemyWeb3(ALCHEMY_API_URL);
const nftContract = new web3.eth.Contract(nftContractABI.abi, RIXTOKEN_CONTRACT_ADDRESS);
const alchemy = new Alchemy({
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
});

async function mintNFT() {
  const nonce = await web3.eth.getTransactionCount(
    METAMASK_PUBLIC_KEY,
    "latest"
  );
  const gasFees = await nftContract.methods
    .mintTo(METAMASK_PUBLIC_KEY)
    .estimateGas({
      from: RIXTOKEN_CONTRACT_ADDRESS,
    });
  console.log("gasFees", gasFees);

  const tx = {
    from: METAMASK_PUBLIC_KEY,
    to: RIXTOKEN_CONTRACT_ADDRESS,
    nonce: nonce,
    gas: gasFees,
    data: nftContract.methods.mintTo(METAMASK_PUBLIC_KEY).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(
    tx,
    METAMASK_PRIVATE_KEY
  );
  try {
    const signedTx = await signPromise;
    console.log("signedTx", signedTx);
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  } catch (e) {
    console.log(e);
  }
}

(async () => {
  await estimateGasOfTx(METAMASK_PUBLIC_KEY, RIXTOKEN_CONTRACT_ADDRESS, nftContract.methods.mintTo(METAMASK_PUBLIC_KEY).encodeABI(), alchemy);
  await getCurrentGas(alchemy);
//   await mintNFT();
})();

require("dotenv").config();

const contract = require('../artifacts/contracts/TestNFT.sol/TestNFT.json');
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const contractAddress = '0x7bAA8E61874E3A136694e57fD5fC9bE823B39E56';
const { API_URL, PUBLIC_KEY, PRIVATE_KEY } = process.env;

const web3 = createAlchemyWeb3(API_URL);
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

    signPromise.then((signedTx) => {
        web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            (err, hash) => {
                if (!err) {
                    console.log('[The hash of your transaction is: ]', hash);
                } else {
                    console.log('[Sth went wrong when submitting your transaction]', err);
                }
            }
        );
    })
        .catch(err => {
            console.log('[Promise failed: ]', err);
        });
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmQjQ8GisURG6D65iJ5AH3Ch7oU4xgzQNtP3aD7pY5hJUQ");

// 0x47b5d849c7bff61795aa24efea8911171af14949d4ba160d042b04909c410481
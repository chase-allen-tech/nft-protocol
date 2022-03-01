https://ethereum.org/en/developers/tutorials/how-to-mint-an-nft/

Part 1
npm init
npm install --save-dev hardhat
npm install dotenv --save
npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
npm install @alch/alchemy-web3

npx hardhat
npx hardhat compile
npx hardhat --network rinkeby run scripts/deploy.js

node scripts/mint-nft.js
npx hardhat verify --network rinkeby 0x7bAA8E61874E3A136694e57fD5fC9bE823B39E56
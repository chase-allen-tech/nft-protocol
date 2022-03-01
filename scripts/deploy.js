const { ethers } = require("hardhat");

async function main() {
    const TestNFT = await ethers.getContractFactory("TestNFT");

    const testNFT = await TestNFT.deploy();
    await testNFT.deployed();

    console.log('[Contract deployed to address:]', testNFT.address);
}

main().then(() => process.exit(0))
    .catch(err => {
        console.log('[deploy err]', err);
        process.exit(1);
    })
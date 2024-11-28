const { ethers } = require("hardhat");

async function main() {
    const PerpetualFutures = await ethers.getContractFactory("PerpetualFutures");
    const contract = await PerpetualFutures.deploy();
    await contract.deployed();
    console.log("Contract deployed to address:", contract.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


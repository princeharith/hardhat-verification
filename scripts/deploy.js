const { ethers } = require("hardhat");
const hre = require("hardhat");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");

async function main() {
    //contract factory is an abstraction to deploy new smart contracts

    const verifyContract = await ethers.getContractFactory("Verify");

    //deploy contract
    const deployedVerifyContract = await verifyContract.deploy();

    await deployedVerifyContract.deployed();

    //print address of deployed contract
    console.log("Verify Contract Address is: ", deployedVerifyContract.address);

    console.log("sleeping...");

    //wait for etherscan to notice that contract has been deployed
    await sleep(100000);

    await hre.run("verify:verify", {
        address: deployedVerifyContract.address,
        constructorArguments: [],
    });
}

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    //calling main function
    main()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });

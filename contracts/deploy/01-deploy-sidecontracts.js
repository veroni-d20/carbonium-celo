const { network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")
    const erc20Token = await deploy("CarboniumToken", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const erc1155Token = await deploy("CarbonCredits", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    const carbonCreditsContract = await ethers.getContract("CarbonCredits")

    const eas = await deploy("EasCarbonium", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    const easContract = await ethers.getContract("EasCarbonium")

    const attestation = await deploy("Attestation", {
        from: deployer,
        args: [easContract.address, carbonCreditsContract.address],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    const attestationContract = await ethers.getContract("Attestation")
    await carbonCreditsContract.transferOwnership(attestationContract.address)

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(basicNft.address, args)
    }
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "erc20Token", "erc1155Token"]

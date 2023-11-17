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
    const carbonCreditsContract = await ethers.getContract('CarbonCredits')

    const attestation = await deploy("Attestation", {
        from: deployer,
        args: [
            "0xaEF4103A04090071165F78D45D83A0C0782c2B2a",
            carbonCreditsContract.address
        ],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    const attestationContract = await ethers.getContract('Attestation')
    await carbonCreditsContract.transferOwnership(attestationContract.address)

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(basicNft.address, args)
    }
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "erc20Token", "erc1155Token"]

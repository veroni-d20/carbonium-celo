const { network, ethers } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS

  log("----------------------------------------------------")
  const carboniumToken = await ethers.getContract('CarboniumToken')
  const carbonCredits = await ethers.getContract('CarbonCredits')
  const liquidityPool = await deploy("LiquidityPool", {
    from: deployer,
    args: [carbonCredits.address, carboniumToken.address],
    log: true,
    waitConfirmations: waitBlockConfirmations,
  })

  // Verify the deployment
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...")
    await verify(basicNft.address, args)
  }
  log("----------------------------------------------------")
}

module.exports.tags = ["all", "liquiditypool"]

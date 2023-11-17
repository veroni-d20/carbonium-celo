const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

async function mintTokens() {
  const [deployer] = await ethers.getSigners()
  const carbonCredits = await ethers.getContract("CarbonCredits")
  const carboniumToken = await ethers.getContract('CarboniumToken')
  const liquidityPool = await ethers.getContract("LiquidityPool")

  // Approve the liquidity pool to spend the tokens
  await carbonCredits.setApprovalForAll(liquidityPool.address, true)
  await carboniumToken.approve(liquidityPool.address, 1000)

  await carbonCredits.mint(deployer.address, 1, 100)
  await carboniumToken.faucet(deployer.address, 1000)

  // Mint tokens for the liquidity pool
  await liquidityPool.deposit(1, 50)
  await carboniumToken.faucet(liquidityPool.address, 1000)

  console.log('--------------------------------------------------------------')

}

mintTokens()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

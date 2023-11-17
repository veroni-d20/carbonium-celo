const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

async function checkQuote() {
  const [deployer] = await ethers.getSigners()
  const carbonCredits = await ethers.getContract("CarbonCredits")
  const carboniumToken = await ethers.getContract('CarboniumToken')
  const liquidityPool = await ethers.getContract("LiquidityPool")

  const expectedERC20 = await liquidityPool.getQuoteERC1155ToERC20(8, 1)
  console.log(`Expected ERC20: ${expectedERC20}`)
  console.log('--------------------------------------------------------------')
}

checkQuote()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

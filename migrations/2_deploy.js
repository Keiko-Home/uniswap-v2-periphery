const Artifactor = require('@truffle/artifactor')
const artifactor = new Artifactor(`${__dirname}/../build/contracts`)
const UniswapV2Factory = artifacts.require('UniswapV2Factory')
const UniswapV2Router02 = artifacts.require('UniswapV2Router02')
const WETH9 = artifacts.require('WETH9')

const weths = {
  mainnet: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  ropsten: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  rinkeby: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  goerli: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  kovan: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
  development: '',
  ganache: ''
}

const networks = {
  mainnet: 1,
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  kovan: 42,
  development: 5777,
  ganache: 5777
}

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(UniswapV2Factory, accounts[0])
  const factory = await UniswapV2Factory.deployed()
  if (!weths[network]) {
    await deployer.deploy(WETH9)
    const weth = await WETH9.deployed()
    weths[network] = weth.address
  }
  const wethAddress = weths[network]
  const _networks = {}
  _networks[networks[network]] = {
    address: wethAddress
  }
  await artifactor.save({
    contractName: 'WETH',
    address: wethAddress,
    networks: _networks
  })
  console.log(factory.address, 'factory.address')
  console.log(wethAddress, 'wethAddress')
  await deployer.deploy(UniswapV2Router02, factory.address, wethAddress)
}

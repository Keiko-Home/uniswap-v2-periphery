const Artifactor = require('@truffle/artifactor')
const artifactor = new Artifactor(`${__dirname}/../build/contracts`)

const InitialArtifacts = {
  UniswapV2Factory: require('@uniswap/v2-core/build/UniswapV2Factory.json')
}

module.exports = async function(deployer) {
  for await (let [contractName, legacyArtifact] of Object.entries(InitialArtifacts)) {
    await artifactor.save({
      contractName,
      ...legacyArtifact
    })
  }
}

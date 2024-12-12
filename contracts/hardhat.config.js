require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.21",
  networks: {
    PolygonzkEVMCardonaTestnet : {
      url : 'https://polygonzkevm-cardona.g.alchemy.com/v2/vo4iU3udeQJyNgBLWSuhGqxuYAGXA7cO',
      accounts : ['7e2f3b5df7988745444907ebcf6c1aeec848f085ffebd8338236e6602ee03111']
    }
  }
};
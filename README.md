WIP

# dappifyETHv2
Blockchain music uploader. Using arweave as file storage, bundlr to interact with it and the Polygon Blockchain.
Since IPFS public Gateways stopped working, arweave seemed like the more attractive storage.

Original repo that is not being updated anymore!: https://github.com/NotWale/dappifyETH

Live version on [On Vercel](https://dappify-v2-testnet.vercel.app/)

(Requires testnet Mumbai MATIC)

This dApp now uses MATIC instead of ETH.
How to use:
1. Fund bundlr Wallet (top left)
2. Upload Songs to arweave through bundlr

WIP TODO:
- Implement tipping.
- Rewrite smart contract in DVM-BASIC and deploy on Dero Stargate Testnet

BUGS TO BE FIXED:
- The uploaded songs don't show up on site refresh unless you click on the debug button "Load Songs" in the bottom left corner.
- The upload might take a while to do.. patience required
- Loading doesn't wait for transaction finish. (even though it did before?)
(- Connect button only shows real MATIC balance after refresh)

Requirements(atm) for compiling:

Truffle: https://trufflesuite.com/

How to use(developer):

1. Compile smart contract with 'truffle compile --network mumbai'
2. Install dependencies using "yarn" in the main project folder
3. Afterwards run the frontend with "yarn run start"


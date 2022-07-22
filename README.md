WIP

# dappifyETHv2
Blockchain music uploader.
Original repo that is not being updated anymore!: https://github.com/NotWale/dappifyETH

Live version on [On Vercel](https://dappify-v2-testnet.vercel.app/)

(Requires GoerliETH)

Completly rewritten the UI to make it more appealing on the eye and rewritten the overall frontend<->backend interaction code.
This version now uses typescript and React v18.0 and is therefore incompatible with the old repo.

WIP TODO:
- Implement tipping.
- Implement new coin to tip users with instead of ETH cause that's expensive...
- Rewrite smart contract in DVM-BASIC and deploy on Dero Stargate Testnet

BUGS TO BE FIXED:
- The uploaded songs don't show up on site refresh unless you click on the debug button "Load Songs" in the bottom left corner.
- The upload might take a while to do.. patience required
- Loading doesn't wait for transaction finish. (even though it did before?)
- Connect button only shows real ETH balance after refresh

Requirements(atm) for compiling:

Truffle: https://trufflesuite.com/

Ganache: https://trufflesuite.com/ganache/

How to use:

1. Open Ganache Server
2. Compile/Deploy the smart contract Dappify.sol in the main project folder using "truffle migrate --reset"
3. Install dependencies using "yarn" in the main project folder
4. Afterwards run the frontend with "yarn run start"
5. Connect to Ganache network with Metamask and import at least one account from Ganache using private keys.


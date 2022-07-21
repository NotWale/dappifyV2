import Identicon from "./Identicon";

type Props = {
  isOpen: boolean;
  isConnected: boolean;
  setOpen: any;
  setWalletAccount: any;
  ethBalance: any;
  handleGetBalance: any;
  curAcc: string;
};

export default function ConnectButton({
  isOpen,
  isConnected,
  setOpen,
  setWalletAccount,
  ethBalance,
  handleGetBalance,
  curAcc,
}: Props) {
  async function handleConnectWallet() {
    console.log("Connecting MetaMask...");

    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    console.log("Account: ", account);
    setWalletAccount(account);
    handleGetBalance();
  }

  return isConnected ? (
    <div className="fixed z-50 flex flex-row-reverse h-14 w-full py-2 pr-2 bg-gray-900">
      <button
        className="flex h-9 items-center border border-solid border-transparent bg-gray-600 rounded-xl text-base font-medium text-white cursor-pointer hover:border-blue-400"
        onClick={() => setOpen(!isOpen)}
      >
        <h6 className="ml-2">
          {ethBalance} ETH
        </h6>
        <h6 className="flex h-full pt-1 ml-2 px-2 border border-gray-800 bg-gray-900 rounded-xl">
          {`${curAcc.slice(0, 6)}...${curAcc.slice(
            curAcc.length - 4,
            curAcc.length
          )}`}
          <Identicon curAcc={curAcc} />
        </h6>
      </button>
    </div>
  ) : (
    <div className="fixed z-50 flex flex-row-reverse h-14 w-full py-2 pr-2 bg-gray-900">
      <button
        className="border-2 border-gray-700 px-3 py-1.5 rounded-xl bg-white hover:border-blue-700"
        onClick={handleConnectWallet}
      >
        Connect to a wallet
      </button>
    </div>
  );
}

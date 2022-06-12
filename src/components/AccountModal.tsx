import { useAccount, useBalance } from "wagmi";

type Props = {
  isOpen: boolean;
  isConnected: boolean;
  setOpen: any;
  setIsConnected: any;
  setWalletAccount: any;
};

export default function AccountModal({
  isOpen,
  isConnected,
  setOpen,
  setIsConnected,
  setWalletAccount,
}: Props) {
  async function handleDisconnect() {
    console.log("Disconnecting MetaMask...");
    setIsConnected(false);
    setWalletAccount("");
  }

  function handleClick() {
    setOpen(!isOpen);
    handleDisconnect();
  }

  return isConnected ? (
    <div
      className={`${
        isOpen ? "relative" : "hidden"
      } float-right mr-2 w-[232px] py-1 rounded-xl border border-gray-600 bg-gray-700 text-gray-400`}
    >
      <button
        className="h-8 w-full hover:bg-gray-600 font-semibold"
        onClick={handleClick}
      >
        Disconnect Wallet
      </button>
    </div>
  ) : (
    <div></div>
  );
}

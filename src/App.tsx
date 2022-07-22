import "./App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Dappify from "./abis/Dappify.json";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import UploadSong from "./components/UploadSong";
import Songs from "./components/Songs";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import { access } from "fs";

let ipfs: IPFSHTTPClient | undefined;
try {
  ipfs = create({
    url: "https://ipfs.infura.io:5001/api/v0",
  });
} catch (error) {
  console.error("IPFS error ", error);
  ipfs = undefined;
}

function App() {
  const [isOpen, setOpen] = useState(false);
  const [walletAccount, setWalletAccount] = useState("");
  const [currentChain, setCurrentChain] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState(0);
  const [selectedWallet, setSelectedWallet] = useState("");
  const [curAcc, setcurAcc] = useState("");
  const [dappify, setDappify] = useState<ethers.Contract>();
  const [posts, setPosts] = useState<{ song: any }[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [deployed, setDeployed] = useState(false);
  const [state, setState] = useState('idle');

  // Initialize the application and MetaMask Event Handlers
  useEffect(() => {
    // Setup Listen Handlers on MetaMask change events
    if (typeof window.ethereum !== "undefined") {
      // Add Listener when accounts switch
      (window as any).ethereum.on("accountsChanged", (accounts: string[]) => {
        console.log("Account changed: ", accounts[0]);
        setWalletAccount(accounts[0]);
      });

      // Do something here when Chain changes
      (window as any).ethereum.on("chainChanged", (chaindId: string) => {
        console.log("Chain ID changed: ", chaindId);
        setCurrentChain(chaindId);
      });
    } else {
      alert("Please install MetaMask to use this service!");
    }
  }, []);

  useEffect(() => {
    setIsConnected(walletAccount ? true : false);
  }, [walletAccount]);

  // Connect Once and set the account.
  // Can be used to trigger a new account request each time,
  // unlike 'eth_requestAccounts'
  const handleConnectOnce = async () => {
    const accounts = await (window as any).ethereum
      .request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      })
      .then(() =>
        (window as any).ethereum.request({ method: "eth_requestAccounts" })
      );

    setWalletAccount(accounts[0]);
  };

  // Get selected account in MetaMask
  useEffect(() => {
    getAccount();
    getContract();
    if (!ipfs) {
      alert("Not connected to IPFS. Checkout out the logs for errors");
    }
  }, []);

  const getAccount = async () => {
    (window as any).ethereum.on("accountsChanged", (accounts: string[]) => {
      setSelectedWallet(accounts[0]);
    });

    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    setcurAcc(accounts[0]);
  };

  const getContract = async () => {
    const networkId = await (window as any).ethereum.request({
      method: "net_version",
    });
    const networkData =
      Dappify.networks[networkId as keyof typeof Dappify.networks];

    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();

    if (networkData) {
      if (await provider.getCode(networkData.address) == "0x") {
        alert("Contract not deployed! at " + networkData.address);
        console.log("Contract not deployed! at " + networkData.address);
      }
      setDeployed(true);
      const dappifycontract = new ethers.Contract(
        networkData.address,
        Dappify.abi,
        signer
      );

      setDappify(dappifycontract);
      loadSongs();
    } else {
      window.alert("Dappify contract not deployed to detected network.");
    }
  };

  const uploadPost = async (description: string) => {
    if(deployed == false) { alert("Contract is not deployed!"); setState('error'); return }
    // upload files
    if (selectedFile) {
      const result = await (ipfs as IPFSHTTPClient).add(selectedFile);
      let hash = result.path;

      if (dappify) {
        const tx = await dappify.uploadPost(hash, description).catch((e: any) => {
          if (e.code === 4001){
              setState('error');
          } 
        });
        console.log(tx);
        const txhash = tx.hash;

        let transactionReceipt = null
        while (transactionReceipt == null) { // Waiting until the transaction is mined
          transactionReceipt = await (window as any).ethereum.request({
            method: "eth_getTransactionReceipt",
            params: [txhash],
          });
        }
        console.log(transactionReceipt);
        setState('success');
        loadSongs();
      }
    } else {
      alert("No file selected!");
      setState('error');
      return;
    }
  };

  // Request the personal signature of the user via MetaMask and deliver a message.
  const handlePersonalSign = async () => {
    console.log("Sign Authentication");

    const message = [
      "This site is requesting your signature to approve login authorization!",
      "I have read and accept the non-existent terms and conditions of this app.",
      "Please sign me in!",
    ].join("\n\n");

    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    const sign = await (window as any).ethereum.request({
      method: "personal_sign",
      params: [message, account],
    });
  };

  // Get the Accounts current Balance and convert to Wei and ETH
  const handleGetBalance = async () => {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    const balance = await (window as any).ethereum.request({
      method: "eth_getBalance",
      params: [account, "latest"],
    });

    // Returns a hex value of Wei
    const wei = parseInt(balance, 16);
    const eth = wei / Math.pow(10, 18); // parse to ETH

    setEthBalance(eth);
  };

  const showPosts = () => {
    if (posts) {
      console.log("posts: ");
      console.log(posts);
      for (var i = 0; i < posts.length; i++) {
        console.log("current song: ");
        console.log(posts[i].song);
        console.log("current song hash: ");
        console.log(posts[i].song.hash);
      }
    }
  };

  const loadSongs = async () => {
    console.log(dappify);
    if (dappify) {
      const postCount = await dappify.postCount();
      showPosts();
      if (postCount) {
        console.log("postCount: ");
        console.log(postCount);

        setPosts([]); // set posts to an empty array

        // load songs
        for (var i = 1; i <= postCount; i++) {
          const song = await dappify.posts(i);

          //setPosts((prev) => [...prev, { posts: [...posts, song] }]);
          setPosts((prev) => [...prev, { song }]);
        }
        if (posts) {
          console.log("posts: ");
          console.log(posts);
        }
      }
    }
  };

  return (
    <Layout>
      <ConnectButton
        isOpen={isOpen}
        setOpen={setOpen}
        setWalletAccount={setWalletAccount}
        isConnected={isConnected}
        ethBalance={ethBalance}
        handleGetBalance={handleGetBalance}
        curAcc={curAcc}
      />
      <AccountModal
        isOpen={isOpen}
        setOpen={setOpen}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
        setWalletAccount={setWalletAccount}
      />
      <UploadSong uploadPost={uploadPost} setSelectedFile={setSelectedFile} state={state} setState={setState} />
      <Songs posts={posts} />
      <button onClick={loadSongs}>Load songs</button>
    </Layout>
  );
}

export default App;

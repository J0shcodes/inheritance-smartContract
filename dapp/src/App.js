import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSigner } from "wagmi";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { abi } from "./will.abi";

function App() {
  const { data: signer } = useSigner();
  const [address, setAddress] = useState("");
  const [displayValue, setDisplayValue] = useState();

  const willContractAddress = "0x24B1525F0061CA0c91bE9f966c41C652A9a8D383";

  useEffect(() => {
    const getAddress = async () => {
      if (signer) {
        const address = await signer.getAddress();
        setAddress(address);
      }
    };
    getAddress();
  }, [signer]);

  if (address) {
    console.log(address);
  }

  console.log(abi);

  const getContractKit = () => {
    if (signer) {
      const web3 = new Web3(window.celo);
      const kit = newKitFromWeb3(web3);
      return kit;
    }
  };

  const kit = getContractKit();
  console.log(kit);

  const getOwner = async () => {
    const kit = getContractKit();

    const contract = new kit.web3.eth.Contract(abi, willContractAddress);

    try {
      const owner = await contract.methods.getOwner().call();
      setDisplayValue(owner);
    } catch (error) {
      console.log(error);
    }
  };

  const getHeir = async () => {
    const kit = getContractKit();

    const contract = new kit.web3.eth.Contract(abi, willContractAddress);

    try {
      const heir = await contract.methods.getHeir().call();
      setDisplayValue(heir);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatus = async () => {
    const kit = getContractKit();

    const contract = new kit.web3.eth.Contract(abi, willContractAddress);

    try {
      const status = await contract.methods.getIsAlive().call();
      console.log(status);
      setDisplayValue(status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 font-semibold text-2xl">
        Simple Will Smart Contract
      </h1>
      <ConnectButton />
      <div className="mt-8">
        <div className="bg-white border border-green-500 border-solid p-4 rounded-lg text-center">
          {displayValue ? displayValue : ""}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-8">
          <button className="bg-red-400 py-2 px-4 text-white rounded-lg">
            Change Owner
          </button>
          <button className="bg-red-400 py-2 px-4 text-white rounded-lg">
            Set Heir
          </button>
          <button className="bg-red-400 py-2 px-4 text-white rounded-lg">
            Change Heir
          </button>
          <button className="bg-red-400 py-2 px-4 text-white rounded-lg">
            Change Deceased Status
          </button>
          <button
            onClick={getOwner}
            className="bg-green-400 py-2 px-4 text-white rounded-lg"
          >
            Owner
          </button>
          <button onClick={getHeir} className="bg-green-400 py-2 px-4 text-white rounded-lg">
            Heir
          </button>
          <button onClick={getStatus} className="bg-green-400 py-2 px-4 text-white rounded-lg">
            Status
          </button>
          <button className="bg-red-600 py-2 px-4 text-white rounded-lg">
            Transfer Inheritance
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

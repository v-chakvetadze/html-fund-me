import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.3.0/ethers.min.js";
import { abi, contractAddress } from "./constants.js";

console.log(ethers);

const createProvider = () => new ethers.BrowserProvider(window.ethereum);

const connect = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    connectButton.innerHTML = "Connected";
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
};

const fund = async (ethString) => {
  const provider = createProvider();
  const signer = await provider.getSigner();
  console.log(signer);

  const contract = new ethers.Contract(contractAddress, abi, signer);
  const tx = await contract.fund({
    value: ethers.parseEther(ethString),
  });
  const result = await tx.wait();
  console.log(result);
};

const getBalance = async () => {
  if (!window.ethereum) return;

  const provider = createProvider();
  const balance = await provider.getBalance(contractAddress);
  console.log(ethers.formatEther(balance));
};

const withdraw = async () => {
  if (!window.ethereum) return;

  const provider = createProvider();
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  try {
    const tx = await contract.withdraw();
    const result = await tx.wait();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export { connect, fund, getBalance, withdraw };

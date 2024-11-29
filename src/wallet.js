import { ethers } from "ethers";
import Web3Modal from "web3modal";

// ABI and contract address
import contractABI from "./PerpetualFutures.json";

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

export const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const instance = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(instance);
    const signer = await provider.getSigner();
    return { signer, provider };
};

export const getContract = (signer) => {
    return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
};


import React, { useState } from "react";
import { connectWallet, getContract } from "./wallet";

function App() {
    const [walletAddress, setWalletAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [contract, setContract] = useState(null);

    const handleConnectWallet = async () => {
        try {
            const { signer } = await connectWallet();
            const address = await signer.getAddress();
            const connectedContract = getContract(signer);
            setWalletAddress(address);
            setContract(connectedContract);
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    const handleGetBalance = async () => {
        if (!contract) return;
        try {
            const userBalance = await contract.balances(walletAddress);
            setBalance(ethers.formatEther(userBalance));
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    const handleDeposit = async () => {
        if (!contract) return;
        try {
            const tx = await contract.deposit({ value: ethers.parseEther("0.1") }); // Deposit 0.1 
ETH
            await tx.wait();
            alert("Deposit successful!");
        } catch (error) {
            console.error("Error depositing:", error);
        }
    };

    const handleWithdraw = async () => {
        if (!contract) return;
        try {
            const tx = await contract.withdraw(ethers.parseEther("0.05")); // Withdraw 0.05 ETH
            await tx.wait();
            alert("Withdrawal successful!");
        } catch (error) {
            console.error("Error withdrawing:", error);
        }
    };

    return (
        <div>
            <h1>Perpetual Futures DApp</h1>
            <button onClick={handleConnectWallet}>
                {walletAddress ? "Wallet Connected" : "Connect Wallet"}
            </button>
            {walletAddress && (
                <div>
                    <p>Connected Wallet: {walletAddress}</p>
                    <button onClick={handleGetBalance}>Get Balance</button>
                    <p>Balance: {balance} ETH</p>
                    <button onClick={handleDeposit}>Deposit 0.1 ETH</button>
                    <button onClick={handleWithdraw}>Withdraw 0.05 ETH</button>
                </div>
            )}
        </div>
    );
}

export default App;


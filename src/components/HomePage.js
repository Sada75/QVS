// HomePage.js
import React, { useState } from 'react';
import { connectMetaMask } from './Blockchain'; // Import the MetaMask connection function
import { useNavigate } from 'react-router-dom'; // We'll use this for navigation
//import UploadProjectPage from './UploadProjectPage';
import "../styles/HomePage.css"

const HomePage = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleConnect = async () => {
    const address = await connectMetaMask();
    if (address) {
      setWalletConnected(true);
      setUserAddress(address);
      setShowOptions(true);
    }
  };

  const handleVoterClick = () => {
    navigate("/VoterPage"); // Navigate to the Voter page
  };

  const handleUploadProjectClick = () => {
    navigate("/UploadProjectPage"); // Navigate to the Upload Project page
  };

  const handleResultsClick = () => {
    navigate("/ResultsPage"); // Navigate to the Results page
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Project Upload Platform</h1>
      
      {!walletConnected ? (
        <button className="connect-wallet-btn" onClick={handleConnect}>
          Connect MetaMask
        </button>
      ) : (
        <div>
          <p>Wallet Connected: {userAddress}</p>
          
          {showOptions && (
            <div className="options">
              <button className="option-btn" onClick={handleVoterClick}>
                Voter
              </button>
              <button className="option-btn" onClick={handleUploadProjectClick}>
                Upload Project
              </button>
              <button className="option-btn" onClick={handleResultsClick}>
                Results
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;

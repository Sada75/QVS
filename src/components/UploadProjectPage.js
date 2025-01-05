import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers'; // Import ethers.js
import '../styles/UploadProjectPage.css';
import contractABI from "../abi/ProjectRegistry.json"; // Import the ABI of your contract

const UploadProjectPage = () => {
  const [projectName, setProjectName] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [projectExplanation, setProjectExplanation] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');

  const navigate = useNavigate();

  // Set up your contract ABI and address (after deploying the contract)
  const contractAddress = "0xceDE3455718E1ac3152dFf01f92c5384B3d1f391"; // Replace with your deployed contract address
  

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Connect to MetaMask
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum); // Connect to the browser's Ethereum provider
      const signer = await provider.getSigner(); // Get the signer (user's wallet)
      const contract = new ethers.Contract(contractAddress, contractABI, signer); // Connect to the contract

      try {
        // Call the registerProject function on the smart contract with the input values
        const tx = await contract.registerProject(projectName, githubLink, youtubeLink);

        // Wait for transaction to be mined
        await tx.wait();

        alert('Project registered successfully!');

        // Navigate back to the homepage
        navigate('/');
      } catch (error) {
        console.error('Error registering project:', error);
        alert('Error registering project.');
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen px-72"
      style={{
        position: "relative",
        width : "100%",
        height : "100vh",
        overflow: "hidden",
      }}
    >
      <video src="./BV1.mp4" autoPlay loop muted style={{position : "absolute", width : "100%", height : "100vh" , objectFit : "cover", zIndex : -1}}></video>
    <div className="upload-project-page">
      <h2>Upload Your Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="githubLink">GitHub Link:</label>
          <input
            type="url"
            id="githubLink"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="projectExplanation">Project Explanation:</label>
          <textarea
            id="projectExplanation"
            value={projectExplanation}
            onChange={(e) => setProjectExplanation(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="youtubeLink">YouTube Link (Project Demo):</label>
          <input
            type="url"
            id="youtubeLink"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Submit Project</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UploadProjectPage;

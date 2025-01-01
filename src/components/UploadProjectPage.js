import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import contractABI from "../abi/ProjectRegistry.json";

const UploadProjectPage = () => {
  const [candidateName, setCandidateName] = useState('');
  const [partyName, setPartyName] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();
  const contractAddress = "0xB0B096b2CE27219AF7079F8f9F5C1442Dc2Eea93";

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '2rem',
      backgroundColor: '#f5f7fa',
    },
    formCard: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      width: '100%',
      maxWidth: '500px',
      margin: '2rem auto',
    },
    title: {
      textAlign: 'center',
      color: '#1a365d',
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
    },
    formGroup: {
      marginBottom: '1.5rem',
      width: '100%',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#4a5568',
      fontSize: '0.9rem',
      fontWeight: '500',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '6px',
      border: '1px solid #e2e8f0',
      fontSize: '1rem',
      transition: 'border-color 0.2s ease',
      outline: 'none',
      '&:focus': {
        borderColor: '#4299e1',
      },
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#4299e1',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      marginTop: '1rem',
      '&:hover': {
        backgroundColor: '#3182ce',
      },
      '&:active': {
        backgroundColor: '#2b6cb0',
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const tx = await contract.registerCandidate(candidateName, partyName, parseInt(age));
        await tx.wait();
        alert('Candidate registered successfully!');
        navigate('/');
      } catch (error) {
        console.error('Error registering candidate:', error);
        alert('Error registering candidate.');
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Register as a Candidate</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="candidateName" style={styles.label}>
              Candidate Name:
            </label>
            <input
              type="text"
              id="candidateName"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="partyName" style={styles.label}>
              Party Name:
            </label>
            <input
              type="text"
              id="partyName"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="age" style={styles.label}>
              Age:
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="18"
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Register Candidate
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProjectPage;
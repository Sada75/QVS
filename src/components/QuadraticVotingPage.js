// src/components/QuadraticVotingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate for navigation

const QuadraticVotingPage = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Function to navigate to the homepage
  const goToHomePage = () => {
    navigate('/HomePage');
  };

  return (
    <div 
      style={{
        fontFamily: '"Arial", sans-serif',
        lineHeight: '1.6',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '40px auto',
        color: '#333',
      }}
    >
      <h1 
        style={{
          textAlign: 'center',
          color: '#2c3e50',
          fontSize: '2.5rem',
          marginBottom: '20px',
        }}
      >
        What is Decentralized Voting on a Blockchain Network?
      </h1>
      <p 
        style={{
          fontSize: '1.1rem',
          marginBottom: '20px',
        }}
      >
       A voting system on a blockchain network is a decentralized platform that uses blockchain technology to ensure secure, transparent, and tamper-proof voting. 
       It provides an innovative solution to many challenges associated with traditional voting systems, such as fraud, lack of transparency, and inefficiency.
      </p>
      
      <h2 
        style={{
          fontSize: '2rem',
          color: '#34495e',
          marginBottom: '15px',
        }}
      >
        How does it work?
      </h2>
      <p 
        style={{
          fontSize: '1.1rem',
          marginBottom: '20px',
        }}
      >

A blockchain-based voting system offers a secure, transparent, and tamper-proof way to conduct elections. 
When a voter casts their ballot, it is encrypted and digitally signed using their private key, ensuring the vote's authenticity and protecting their identity. 
This encrypted vote is then recorded on the blockchain, where it becomes an immutable part of a decentralized ledger, safeguarded by cryptographic algorithms. 
This prevents any unauthorized changes or tampering with the recorded data.
       
      </p>
      
      {/* <h3 
        style={{
          fontSize: '1.5rem',
          color: '#2980b9',
          marginBottom: '15px',
        }}
      >
        Example:
      </h3> */}
      <p 
        style={{
          fontSize: '1.1rem',
          marginBottom: '20px',
        }}
      >
        This innovative approach combines robust security, anonymity, and real-time auditability, making it a revolutionary alternative to traditional voting systems. 
        By leveraging blockchain technology, elections can be conducted more efficiently, with enhanced voter confidence and reduced operational costs.
      </p>
      
      <p 
        style={{
          fontSize: '1.1rem',
          marginBottom: '30px',
        }}
      >
         The decentralized nature of blockchain ensures that no single entity controls the voting process, making it resilient to manipulation or fraud.
         Each vote is independently verified by the network's nodes, ensuring that only eligible voters participate and that no duplicate votes are recorded. 
         Voters can even verify that their vote has been counted by checking the transaction ID on the blockchain, maintaining trust and transparency in the process.
      </p>

      <button 
        onClick={goToHomePage}
        style={{
          display: 'block',
          margin: '0 auto',
          backgroundColor: '#1abc9c',
          color: '#fff',
          fontSize: '1rem',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#16a085'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#1abc9c'}
      >
        Understood
      </button>
    </div>
  );
};

export default QuadraticVotingPage;

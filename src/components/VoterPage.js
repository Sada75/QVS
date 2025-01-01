import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import CandidateRegistryABI from "../abi/ProjectRegistry.json";

const VoterPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contract, setContract] = useState(null);

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "2rem auto",
      padding: "2.5rem",
      fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      background: "linear-gradient(145deg, #ff9a9e 0%, #fad0c4 100%)",
      borderRadius: "20px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
      minHeight: "80vh",
      border: "1px solid rgba(255, 255, 255, 0.18)",
    },
    header: {
      textAlign: "center",
      color: "#1e3a8a",
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "2.5rem",
      borderBottom: "2px solid rgba(147, 197, 253, 0.3)",
      paddingBottom: "1.25rem",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
      letterSpacing: "-0.02em",
    },
    candidatesList: {
      display: "grid",
      gap: "1.5rem",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      padding: "0.5rem",
    },
    candidateCard: {
      padding: "1.75rem",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      border: "1px solid rgba(147, 197, 253, 0.2)",
      borderRadius: "16px",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
      backdropFilter: "blur(10px)",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 12px 28px rgba(0, 0, 0, 0.08)",
      },
    },
    candidateInfo: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      padding: "0.5rem 0",
    },
    candidateName: {
      fontSize: "1.4rem",
      fontWeight: "600",
      color: "#1e3a8a",
      marginBottom: "0.5rem",
      letterSpacing: "-0.02em",
      lineHeight: "1.3",
    },
    candidateParty: {
      fontSize: "1.1rem",
      color: "#3b82f6",
      fontWeight: "500",
      background: "rgba(59, 130, 246, 0.08)",
      padding: "0.4rem 0.8rem",
      borderRadius: "6px",
      display: "inline-block",
    },
    ageInfo: {
      fontSize: "1rem",
      color: "#64748b",
      background: "rgba(100, 116, 139, 0.08)",
      padding: "0.4rem 0.8rem",
      borderRadius: "6px",
      display: "inline-block",
      width: "fit-content",
    },
    button: {
      padding: "1rem 1.75rem",
      fontSize: "1.1rem",
      fontWeight: "600",
      borderRadius: "12px",
      border: "none",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      width: "100%",
      cursor: hasVoted ? "not-allowed" : "pointer",
      background: hasVoted 
        ? "#e2e8f0"
        : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      color: hasVoted ? "#94a3b8" : "#ffffff",
      boxShadow: hasVoted 
        ? "none" 
        : "0 4px 12px rgba(37, 99, 235, 0.2)",
      opacity: hasVoted ? 0.7 : 1,
      "&:hover": {
        transform: hasVoted ? "none" : "translateY(-2px)",
        boxShadow: hasVoted 
          ? "none" 
          : "0 6px 20px rgba(37, 99, 235, 0.25)",
      },
      "&:active": {
        transform: "translateY(1px)",
      },
    },
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh",
      fontSize: "1.25rem",
      color: "#3b82f6",
      flexDirection: "column",
      gap: "1rem",
      textShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    },
  };

  // Initialize contract and fetch candidates
  useEffect(() => {
    const initializeContract = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(
          "0xB0B096b2CE27219AF7079F8f9F5C1442Dc2Eea93",
          CandidateRegistryABI,
          signer
        );
        setContract(contractInstance);

        const candidatesList = await contractInstance.getAllCandidates();
        setCandidates(candidatesList);
        setLoading(false);
      } catch (error) {
        console.error("Error loading contract:", error);
        setLoading(false);
      }
    };

    initializeContract();
  }, []);

  const voteForCandidate = async (candidateIndex) => {
    if (hasVoted) return;

    try {
      const tx = await contract.voteForCandidate(candidateIndex);
      await tx.wait();
      setSelectedCandidate(candidateIndex);
      setHasVoted(true);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Decentralized Voting System</h1>
      {loading ? (
        <div style={styles.loadingContainer}>
          <span>Loading candidates...</span>
        </div>
      ) : (
        <div style={styles.candidatesList}>
          {candidates.map((candidate, index) => (
            <div key={index} style={styles.candidateCard}>
              <div style={styles.candidateInfo}>
                <span style={styles.candidateName}>
                  {candidate.candidateName}
                </span>
                <span style={styles.candidateParty}>
                  Party: {candidate.partyName}
                </span>
                <span style={styles.ageInfo}>Age: {candidate.age}</span>
              </div>
              <button
                style={styles.button}
                disabled={hasVoted}
                onClick={() => voteForCandidate(index)}
              >
                {hasVoted && selectedCandidate === index
                  ? "Vote Recorded"
                  : "Cast Vote"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VoterPage;
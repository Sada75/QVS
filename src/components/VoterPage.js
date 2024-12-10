import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers"; // Changed to BrowserProvider
import { ethers } from "ethers"; // Import ethers
import ProjectRegistryABI from "../abi/ProjectRegistry.json"; // Import the ABI of your contract

const VoterPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current project index
  const [userCredits, setUserCredits] = useState(100); // Track remaining credits for the user
  const [userVotes, setUserVotes] = useState({}); // Track votes per user per project
  const [loading, setLoading] = useState(true);
  const [contract, setContract] = useState(null);

  // Initialize the contract instance
  useEffect(() => {
    const initializeContract = async () => {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum); // Use BrowserProvider
        const signer = await provider.getSigner(); // Await the signer
        const contractAddress = "0x374237c9ed91d1fb92715f7bc01cf73511f1e627"; // Replace with your contract address
        const contractInstance = new ethers.Contract(
          contractAddress,
          ProjectRegistryABI,
          signer
        );
        setContract(contractInstance);
      } else {
        alert("Please install MetaMask!");
      }
    };

    initializeContract();
  }, []);

  // Fetch all projects on load
  useEffect(() => {
    if (!contract) return;

    const fetchProjects = async () => {
      const [addresses, names, githubLinks, youtubeLinks, credits] =
        await contract.getAllProjects();

      const projectList = addresses.map((address, index) => ({
        address,
        name: names[index],
        github: githubLinks[index],
        youtube: youtubeLinks[index],
        credits: credits[index].toString(),
      }));

      setProjects(projectList);
      setLoading(false);
    };

    fetchProjects();
  }, [contract]);

  // Handle voting for a project
  const voteForProject = async (projectAddress) => {
    const votes = userVotes[projectAddress] || 0;
    const newVotes = votes + 1;
    const quadraticCredits = Math.pow(newVotes, 2);

    // Check if the user has enough credits left
    if (quadraticCredits > userCredits) {
      alert("You don't have enough credits to vote!");
      return;
    }

    // Update local state for user votes and credits
    setUserVotes({
      ...userVotes,
      [projectAddress]: newVotes,
    });
    setUserCredits(userCredits - quadraticCredits);

    // Calculate total credits and send to smart contract
    const totalCredits =
      parseInt(projects[currentIndex].credits) + quadraticCredits;

    try {
      const tx = await contract.updateCredits(projectAddress, totalCredits);
      await tx.wait();

      alert("Credits updated successfully!");

      // Move to the next project
      if (currentIndex + 1 < projects.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        alert("All projects have been voted on!");
      }
    } catch (err) {
      console.error("Error updating credits:", err);
    }
  };

  if (loading) return <div>Loading projects...</div>;

  if (currentIndex >= projects.length)
    return <div>All projects have been displayed!</div>;

  // Display current project details
  const currentProject = projects[currentIndex];

  return (
    <div>
      <h1>Project Registry</h1>
      <p>Remaining Credits: {userCredits}</p>
      <div key={currentIndex}>
        <h2>{currentProject.name}</h2>
        <p>
          GitHub:{" "}
          <a
            href={currentProject.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            {currentProject.github}
          </a>
        </p>
        <p>
          YouTube:{" "}
          <a
            href={currentProject.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            {currentProject.youtube}
          </a>
        </p>
        <p>Credits: {currentProject.credits}</p>
        <button
          onClick={() => voteForProject(currentProject.address)}
          disabled={userCredits <= 0}
        >
          Vote
        </button>
      </div>
      {userCredits <= 0 && <p>You have used all your credits!</p>}
    </div>
  );
};

export default VoterPage;
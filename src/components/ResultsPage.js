import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const ProjectRegistryAddress = "0xceDE3455718E1ac3152dFf01f92c5384B3d1f391";
const ProjectRegistryABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newCreditCount",
				"type": "uint256"
			}
		],
		"name": "CreditsUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "projectName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "githubLink",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "youtubeLink",
				"type": "string"
			}
		],
		"name": "ProjectRegistered",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getAllProjects",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "projectName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "githubLink",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "youtubeLink",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "credits",
						"type": "uint256"
					}
				],
				"internalType": "struct ProjectRegistry.Project[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "users",
				"type": "address[]"
			}
		],
		"name": "getProjects",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "projectName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "githubLink",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "youtubeLink",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "credits",
						"type": "uint256"
					}
				],
				"internalType": "struct ProjectRegistry.Project[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "projects",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "projectName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "githubLink",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "youtubeLink",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "credits",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_projectName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_githubLink",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_youtubeLink",
				"type": "string"
			}
		],
		"name": "registerProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_credits",
				"type": "uint256"
			}
		],
		"name": "updateCredits",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userAddresses",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const App = () => {
  const [projects, setProjects] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Connect to the Ethereum provider using BrowserProvider
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          ProjectRegistryAddress,
          ProjectRegistryABI,
          provider
        );

        // Fetch all projects
        const projectList = await contract.getAllProjects();

        // Parse the projects and find the winner
        const parsedProjects = projectList.map((project) => ({
          owner: project.owner,
          projectName: project.projectName,
          githubLink: project.githubLink,
          youtubeLink: project.youtubeLink,
          credits: parseInt(project.credits.toString(), 10),
        }));

        setProjects(parsedProjects);

        // Determine the winner
        const topProject = parsedProjects.reduce((prev, current) => {
          return current.credits > prev.credits ? current : prev;
        }, parsedProjects[0]);

        setWinner(topProject);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Project Showcase</h1>
      {winner && (
        <div style={{ marginBottom: "30px", border: "2px solid gold", padding: "10px", backgroundColor: "#f9f6e7" }}>
          <h2>🏆 Winner: {winner.projectName}</h2>
          <p><strong>Credits:</strong> {winner.credits}</p>
          <p><strong>GitHub:</strong> <a href={winner.githubLink} target="_blank" rel="noopener noreferrer">{winner.githubLink}</a></p>
          <p><strong>YouTube:</strong> <a href={winner.youtubeLink} target="_blank" rel="noopener noreferrer">{winner.youtubeLink}</a></p>
		  <p><strong>Prize Money:</strong>{100000*winner.credits/(projects.length*100)}</p>
        </div>
      )}

      <h1>All Projects</h1>
      <ul>
        {projects.map((project, index) => (
          <li key={index} style={{ marginBottom: "15px" }}>
            <h2>{project.projectName}</h2>
            <p><strong>Credits:</strong> {project.credits}</p>
            <p><strong>GitHub:</strong> <a href={project.githubLink} target="_blank" rel="noopener noreferrer">{project.githubLink}</a></p>
            <p><strong>YouTube:</strong> <a href={project.youtubeLink} target="_blank" rel="noopener noreferrer">{project.youtubeLink}</a></p>
            <p><strong>Prize Money:</strong>{100000*project.credits/(projects.length*100)} BTC</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

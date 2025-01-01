// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract ElectionRegistry {
    // Struct to store candidate details
    struct Candidate {
        address owner; // Address of the candidate's representative or self
        string candidateName;
        string partyName;
        uint age;
        uint votes; // Number of votes received
    }

    // Array to store all candidates
    Candidate[] public candidates;

    // Mapping to check if an address is already registered
    mapping(address => bool) public isRegistered;

    // Event to notify when a candidate is registered
    event CandidateRegistered(
        address indexed owner,
        string candidateName,
        string partyName,
        uint age
    );

    // Function to register a candidate
    function registerCandidate(
        string calldata _candidateName,
        string calldata _partyName,
        uint _age
    ) external {
        require(!isRegistered[msg.sender], "Candidate already registered");
        require(bytes(_candidateName).length > 0, "Candidate name is required");
        require(bytes(_partyName).length > 0, "Party name is required");
        require(_age > 18, "Candidate must be at least 18 years old");

        // Add the candidate to the array
        candidates.push(
            Candidate({
                owner: msg.sender,
                candidateName: _candidateName,
                partyName: _partyName,
                age: _age,
                votes: 0
            })
        );

        // Mark the address as registered
        isRegistered[msg.sender] = true;

        emit CandidateRegistered(msg.sender, _candidateName, _partyName, _age);
    }

    // Function to fetch all candidate details
    function getAllCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }

    // Function to cast a vote to a candidate by index
    function voteForCandidate(uint candidateIndex) external {
        require(candidateIndex < candidates.length, "Invalid candidate index");

        // Increment the vote count for the selected candidate
        candidates[candidateIndex].votes += 1;
    }

    // Function to fetch details of a specific candidate by index
    function getCandidateDetails(uint candidateIndex) 
        external 
        view 
        returns (
            address owner,
            string memory candidateName,
            string memory partyName,
            uint age,
            uint votes
        ) 
    {
        require(candidateIndex < candidates.length, "Invalid candidate index");

        Candidate memory candidate = candidates[candidateIndex];
        return (
            candidate.owner,
            candidate.candidateName,
            candidate.partyName,
            candidate.age,
            candidate.votes
        );
    }
}

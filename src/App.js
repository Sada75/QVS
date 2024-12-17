// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage';
import VoterPage from './components/VoterPage';
import UploadProjectPage from './components/UploadProjectPage';
import QuadraticVotingPage from './components/QuadraticVotingPage'; // Import the QuadraticVotingPage

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route will be the Quadratic Voting page */}
          <Route exact path="/" element={<QuadraticVotingPage />} />
          
          {/* After the explanation, users can navigate to the HomePage */}
          <Route path="/HomePage" element={<HomePage />} />
          
          {/* Other pages */}
          <Route path="/VoterPage" element={<VoterPage />} />
          <Route path="/UploadProjectPage" element={<UploadProjectPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

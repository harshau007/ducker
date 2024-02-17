import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NoImage from './components/NoImage';
import WithImage from './components/WithImage';
import Graph from './components/Graph1'
import Logs from './components/Logs';

// Components for different pages

// Main App component
const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        
        
        {/* Route configuration */}
        <Routes>
          <Route path="/" element={<NoImage />} />
          <Route path='/docker/*' element={<WithImage />} />
          <Route path='/graph' element={<Graph />} />
          <Route path='/logs' element={<Logs />} />
        </Routes>
      </div>
    </Router>
  );
};

// Export the App component
export default App;

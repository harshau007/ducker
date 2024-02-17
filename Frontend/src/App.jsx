import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NoImage from './components/NoImage';
import WithImage from './components/WithImage';

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
       
        </Routes>
      </div>
    </Router>
  );
};

// Export the App component
export default App;

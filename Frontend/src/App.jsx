import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoImage from './components/NoImage';
import WithImage from './components/WithImage';
import Graph from './components/Graph1'
import Logs from './components/Logs';
import './App.css'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<NoImage />} />
          <Route path='/docker/:id' element={<WithImage />} />
          <Route path='/graph' element={<Graph id={"450c2dc03a"}/>} />
          <Route path='/logs' element={<Logs />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

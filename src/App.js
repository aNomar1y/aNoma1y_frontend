import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RulePage from './pages/RulePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RulePage />} />
      </Routes>
    </Router>
  );
}

export default App;
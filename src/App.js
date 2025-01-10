import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RulePage from './pages/RulePage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header /> {/* Header 항상 렌더링 */}
      <Routes>
        {/* 라우트 정의 */}
        <Route path="/" element={<RulePage />} />
      </Routes>
      <Footer /> {/* Footer 항상 렌더링 */}
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesIndex from './routes'; // 라우트 관리 컴포넌트 불러오기
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header /> {/* Header 항상 렌더링 */}
      <RoutesIndex /> {/* 라우트 관리 컴포넌트 */}
      <Footer /> {/* Footer 항상 렌더링 */}
    </Router>
  );
}

export default App;
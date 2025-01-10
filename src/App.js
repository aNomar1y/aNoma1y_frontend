import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesIndex from './routes'; // 라우트 관리 컴포넌트 불러오기
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <Header /> {/* RulePage가 아니면 Header 렌더링 */}
            <RoutesIndex /> {/* 라우트 관리 컴포넌트 */}
            <Footer /> {/* RulePage가 아니면 Footer 렌더링 */}
        </Router>
    );
}

export default App;
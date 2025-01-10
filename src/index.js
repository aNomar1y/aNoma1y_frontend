import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // App.js 가져오기
import './index.css'; // 전역 스타일 (선택 사항)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // 스타일 파일 추가

const container = document.getElementById("root");
const root = createRoot(container);

document.body.style.cursor = "url('./pages/assets/mouse/green_transparent.png'), auto";
document.addEventListener("mousemove", () => {
  document.body.style.cursor = "url('./pages/assets/mouse/green_transparent.png'), auto";
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesIndex from "./routes"; // 라우트 관리 컴포넌트 불러오기
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <RoutesIndex /> {/* 라우트 관리 컴포넌트 */}
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesIndex from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* 실제 라우트들을 RoutesIndex에서 관리 */}
      <RoutesIndex />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

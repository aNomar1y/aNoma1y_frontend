import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesIndex from "./routes"; // 라우트 관리 컴포넌트 불러오기
import BgmController from "./BgmController";
import { BgmProvider } from "./BgmContext"; // BGM 상태 관리용 Context

function App() {
  return (
    <BgmProvider>
      <Router>
        <BgmController /> {/* BGM 컨트롤러 */}
        <RoutesIndex /> {/* 라우트 관리 컴포넌트 */}
      </Router>
    </BgmProvider>
  );
}

export default App;
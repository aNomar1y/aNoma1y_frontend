import React, {useState} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesIndex from "./routes"; // 라우트 관리 컴포넌트 불러오기
import BgmController from "./BgmController";

function App() {

  const [shouldPlay, setShouldPlay] = useState(false); // BGM 재생 여부 관리

  const handlePlayBgm = (play) => {
    setShouldPlay(play);
  };


  return (
    <Router>
      <BgmController shouldPlay={shouldPlay} /> {/* BGM 컨트롤러 */}
      <RoutesIndex onPlayBgm={handlePlayBgm}/> {/* 라우트 관리 컴포넌트 */}
    </Router>
  );
}

export default App;

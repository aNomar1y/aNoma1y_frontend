import React, {useRef} from "react";
import { useNavigate } from "react-router-dom";
import "./RuleNextPage.css";

function RuleNextPage() {

  const audioRef = useRef(null); // 클릭 소리를 제어하기 위한 ref
      
  const playClickSound = () => {
    if (audioRef.current && document.body.contains(audioRef.current)) {
      console.log("Playing click sound...");
      audioRef.current.currentTime = 0; // 처음부터 재생
      audioRef.current
        .play()
        .then(() => console.log("Click sound played successfully."))
        .catch((error) => {
          console.error("Error playing click sound:", error);
        });
    } else {
      console.error("Audio element is not available or removed from the document.");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="rule-container">
      <audio ref={audioRef} src="/assets/sounds/mouse-click-sound.mp3" preload="auto" />
      <h1>&lt;N1 관리자 행동수칙&gt;</h1>
      <ol>
        <li>귀하가 현재 계신 곳은 본관의 1층 CCTV실입니다.</li>
        <li>화면에 나타나는 모든 것은 의미가 있습니다.</li>
        <li>변화에 대한 보고는 즉각적으로 하십시오.</li>
        <li>불필요한 보고는 관제센터의 신뢰를 잃게 만듭니다.</li>
        <li>먼저 다가오는 모든 존재와 교류하려 하지 마십시오.</li>
        <li>이곳에서 경험한 일은 외부에 유출될 수 없습니다.</li>
      </ol>
      <div className="rnavigation-buttons">
        <button className="rback-button" onClick={() => {
          playClickSound(); // 클릭 소리 재생
          setTimeout(() => navigate("/rule"), 250);
          }}>
          &larr;
        </button>
        <button className="rnext-button" onClick={() => {
          playClickSound(); // 클릭 소리 재생
          setTimeout(() => navigate("/cctv"), 250);
          }}>
          &rarr;
        </button>
      </div>
    </div>
  );
}

export default RuleNextPage;

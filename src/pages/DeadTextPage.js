import React, { useEffect, useRef } from "react";
import TypingEffect from "../components/TypingEffect"; // TypingEffect 컴포넌트 가져오기
import { useNavigate } from "react-router-dom";
import "./DeadTextPage.css"; // DeadTextPage 전용 CSS 파일

function DeadTextPage() {
  const navigate = useNavigate();
  const beepAudioRef = useRef(null); // 삐

  // 화면 렌더링 시 소리 재생
  useEffect(() => {
    if(beepAudioRef.current) {
      beepAudioRef.current.loop = true;
      beepAudioRef.current.volume = 0.3;
      beepAudioRef.current.play().catch((err)=>{
        console.error("Beep Sound Play Error:", err);
      });
    }
    // 언마운트 시 소리 멈춤
    return () => {
      if(beepAudioRef.current) {
        beepAudioRef.current.pause();
        beepAudioRef.current.currentTime = 0;
      }
    };
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); // MainPage로 이동
    }, 2500); // 2초 후 이동

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);

  return (
    <div className="deadtext-container">
      <audio ref={beepAudioRef} src="/assets/sounds/beep.mp3" preload="auto" />
      <div className="deadtext-content">
        <TypingEffect
          lines={[
            "관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량",
            "관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량",
            "관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량",
            "관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량",
            "관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량",
            "관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량",
            "관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량",
            "관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량",
            "관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량",
            "관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량",
            "관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량",
            "관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량",
            "관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량",
          ]}
          minDelay={0.1} // 최소 딜레이 (ms)
          maxDelay={0.1} // 최대 딜레이 (ms)
        />
      </div>
    </div>
  );
}

export default DeadTextPage;

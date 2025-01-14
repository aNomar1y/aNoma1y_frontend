import React, { useEffect, useState, useRef } from "react";
import TypingEffect from "../components/TypingEffect"; // TypingEffect 컴포넌트 가져오기
import { useNavigate } from "react-router-dom";
import "./FiredTextPage.css"; // DeadTextPage 전용 CSS 파일

function FiredTextPage() {
  const navigate = useNavigate();
  const typingAudioRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if(isTyping) {
      if (typingAudioRef.current) {
        typingAudioRef.current.loop = true;
        typingAudioRef.current.play();
      }
    } else {
      if (typingAudioRef.current) {
        typingAudioRef.current.pause();
        typingAudioRef.current.currentTime = 0;
      }
    }
  }, [isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); // MainPage로 이동
    }, 4000); // 2초 후 이동

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);

  return (
    <div className="firedtext-container">
      <audio
        ref = {typingAudioRef}
        src = "/assets/sounds/keyboard-typing.mp3"
        preload = "auto"
      />
      <div className="firedtext-content">
        <TypingEffect
          lines={["해고 되었습니다.", "비밀 유지 조항에 의거하여 처리됩니다."]}
          minDelay={20} // 최소 딜레이 (ms)
          maxDelay={90} // 최대 딜레이 (ms)
          onTypingStart={() => setIsTyping(true)}
          onTypingEnd={() => setIsTyping(false)}
        />
      </div>
    </div>
  );
}

export default FiredTextPage;

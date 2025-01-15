import React, { useState, useEffect, useRef } from "react";
import "./RulePage.css"; // 스타일을 위한 CSS 파일
import TypingEffect from "../components/TypingEffect"; // TypingEffect 가져오기
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 React Router 훅
import { AiFillHome } from "react-icons/ai"; // 홈 아이콘

function RulePage() {

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
  const typingAudioRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleNext = () => {
    navigate("/rulenext"); // 이동할 경로 지정
  };
  const handleHome = () => {
    navigate("/home"); // 홈페이지로 이동
  };

  // 타이핑 상태가 변경될 때 타이핑 사운드 처리
  useEffect(() => {
    if (isTyping) {
      if (typingAudioRef.current) {
        typingAudioRef.current.loop = true; // 반복 재생
        typingAudioRef.current.play().catch((err) => {
          console.error("Typing Sound Play Error:", err);
        });
      }
    } else {
      if (typingAudioRef.current) {
        typingAudioRef.current.pause();
        typingAudioRef.current.currentTime = 0; // 재생 위치 초기화
      }
    }
  }, [isTyping]);





  return (
    <div className="rule-container">
      {/* 타이핑 사운드 */}
      <audio
        ref={typingAudioRef}
        src="/assets/sounds/keyboard-typing.mp3"
        preload="auto"
      />
      <div className="home-icon" onClick={() => {
        playClickSound();
        setTimeout(() => handleHome(), 250);
        }}>
        <AiFillHome />
      </div>
      <div className="rule-content">
        {/* TypingEffect를 사용하여 텍스트 출력 */}
        <TypingEffect
          lines={[
            "[Web 발신] N1 관제센터입니다.",
            "귀하의 최종합격을 축하드립니다.",
            "아래 안내된 사항 확인 후 근무하기 바랍니다.",
          ]}
          minDelay={10} // 최소 딜레이 (ms)
          maxDelay={200} // 최대 딜레이 (ms)
          onTypingStart={() => setIsTyping(true)} // 타이핑 시작 이벤트
          onTypingEnd={() => setIsTyping(false)} // 타이핑 종료 이벤트
        />
      </div>
      <button className="rule-next-button" onClick={() => {
        playClickSound();
        setTimeout(() => handleNext(), 250);
        }}>
        &rarr;
      </button>
    </div>
  );
}

export default RulePage;

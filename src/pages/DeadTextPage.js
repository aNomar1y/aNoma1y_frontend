import React, { useEffect } from "react";
import TypingEffect from "../components/TypingEffect"; // TypingEffect 컴포넌트 가져오기
import { useNavigate } from "react-router-dom";
import "./DeadTextPage.css"; // DeadTextPage 전용 CSS 파일

function DeadTextPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); // MainPage로 이동
    }, 2500); // 2초 후 이동

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);

  return (
    <div className="deadtext-container">
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
          ]}
          minDelay={1} // 최소 딜레이 (ms)
          maxDelay={1} // 최대 딜레이 (ms)
        />
      </div>
    </div>
  );
}

export default DeadTextPage;

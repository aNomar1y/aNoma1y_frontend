import React from "react";
import "./RulePage.css"; // 스타일을 위한 CSS 파일
import TypingEffect from "../components/TypingEffect"; // TypingEffect 가져오기
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 React Router 훅
import { AiFillHome } from "react-icons/ai"; // 홈 아이콘

function RulePage() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/rulenext"); // 이동할 경로 지정
  };
  const handleHome = () => {
    navigate("/home"); // 홈페이지로 이동
  };

  return (
    <div className="rule-container">
      <div className="home-icon" onClick={handleHome}>
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
        />
      </div>
      <button className="rule-next-button" onClick={handleNext}>
        &rarr;
      </button>
    </div>
  );
}

export default RulePage;

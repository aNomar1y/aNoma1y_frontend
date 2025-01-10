import React from 'react';
import './RulePage.css'; // 스타일을 위한 CSS 파일
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 React Router 훅

function RulePage() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/rulenext'); // 이동할 경로 지정
  };

  return (
    <div className="rule-container">
      <div className="rule-content">
        <p>[Web 발신] N1 관제센터입니다.</p>
        <p>귀하의 최종합격을 축하드립니다.</p>
        <p>아래 안내된 사항 확인 후 근무하기 바랍니다.</p>
      </div>
      <button className="rule-next-button" onClick={handleNext}>
        &rarr;
      </button>
    </div>
  );
}

export default RulePage;

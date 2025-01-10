import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RuleNextPage.css';

function RuleNextPage() {
  const navigate = useNavigate();

  return (
    <div className="rule-container">
      <h1>&lt;N1 관리자 행동수칙&gt;</h1>
      <ol>
        <li>귀하가 현재 계신 곳은 본관의 1층 114호입니다.</li>
        <li>화면에 나타나는 모든 것은 의미가 있습니다.</li>
        <li>변화에 대한 보고는 즉각적으로 하십시오.</li>
        <li>불필요한 보고는 관제센터의 신뢰를 잃게 만듭니다.</li>
        <li>먼저 다가오는 모든 존재와 교류하려 하지 마십시오.</li>
        <li>이곳에서 경험한 일은 외부에 유출될 수 없습니다.</li>
      </ol>
      <div className="navigation-buttons">
        <button className="back-button" onClick={() => navigate('/rule')}>
          &larr;
        </button>
        <button className="next-button" onClick={() => navigate('/')}>
          &rarr;
        </button>
      </div>
    </div>
  );
}

export default RuleNextPage;

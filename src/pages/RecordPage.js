import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecordPage.css"; // CSS 파일을 따로 관리

const RecordPage = () => {
  const navigate = useNavigate();

  // 현상 기록 리스트 데이터
  const records = [
    "114호 실습실",
    "1층 복도",
    "매점",
    "117호 다목적실",
    "114호 외부 창문",
    "201호 강의실",
  ];

  return (
    <div className="record-container">
      {/* 왼쪽 상단 화살표 */}
      <div className="back-button" onClick={() => navigate("/")}>
        &larr; 현상 기록
      </div>

      {/* 리스트 출력 */}
      <ul className="record-list">
        {records.map((record, index) => (
          <li key={index} className="record-item">
            {record}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordPage;
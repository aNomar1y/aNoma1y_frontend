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

// // 현상 기록 리스트 데이터와 해당 경로
// const records = [
//     { name: "114호 실습실", path: "/room/114" },
//     { name: "1층 복도", path: "/hall/1st" },
//     { name: "매점", path: "/store" },
//     { name: "117호 다목적실", path: "/room/117" },
//     { name: "114호 외부 창문", path: "/window/114" },
//     { name: "201호 강의실", path: "/room/201" },
//     ];

  return (
    <div className="record-container">
      {/* 왼쪽 상단 화살표와 제목 */}
      <div className="header">
        <span className="back-button" onClick={() => navigate("/")}>
          &larr;
        </span>
        <span className="header-title">현상 기록</span>
      </div>

      {/* 리스트 출력 */}
      <ul className="record-list">
        {records.map((record, index) => (
          <li key={index} className="record-item">
            <span className="record-text">{record}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordPage;

{/* <ul className="record-list">
        {records.map((record, index) => (
          <li
            key={index}
            className="record-item"
            onClick={() => navigate(record.path)} // 클릭 시 해당 경로로 이동
          >
            <span className="record-text">{record.name}</span>
          </li>
        ))}
      </ul> */}
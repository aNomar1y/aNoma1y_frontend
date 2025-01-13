import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecordPage.css"; // CSS 파일을 따로 관리

const RecordPage = () => {
  const navigate = useNavigate();

  /*
  // 현상 기록 리스트 데이터
  const records = [
    "114호 실습실", 
    "1층 복도",
    "매점",
    "117호 다목적실",
    "114호 외부 창문",
    "201호 강의실",
  ];*/

  // // 현상 기록 리스트 데이터와 해당 경로
  const records = [
    { name: "CCTV실", path: "/cctv_room" },
    { name: "체력단련실", path: "/gym" },
    { name: "창밖", path: "/outside" },
    { name: "201호 강의실", path: "/room201" },
    { name: "117호 다목적실", path: "/room117" },
    { name: "대피소 계단", path: "/stairs" },
  ];

  return (
    <div className="record-container">
      <div className="header">
        <span className="back-button" onClick={() => navigate(-1)}>
          &larr;
        </span>
        <span className="header-title">현상 기록</span>
      </div>

      <ul className="record-list">
        {records.map((record, index) => (
          <li
            key={index}
            className="record-item"
            onClick={() => navigate(record.path)}
          >
            <span className="record-text">{record.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordPage;


  /* <ul className="record-list">
        {records.map((record, index) => (
          <li
            key={index}
            className="record-item"
            onClick={() => navigate(record.path)} // 클릭 시 해당 경로로 이동
          >
            <span className="record-text">{record.name}</span>
          </li>
        ))}
      </ul> */


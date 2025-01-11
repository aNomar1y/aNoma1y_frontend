import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecordDetailPage.css";

const RecordDetailPage = () => {
  const { id } = useParams(); // 경로 파라미터 가져오기
  const navigate = useNavigate();

  // 예시 데이터
  const recordDetails = {
    room114: {
      title: "114호 실습실",
      images: ["room114_1.jpg", "room114_2.jpg"],
    },
    hall: { title: "1층 복도", images: ["hall_1.jpg", "hall_2.jpg"] },
    store: { title: "매점", images: ["store_1.jpg", "store_2.jpg"] },
    room117: {
      title: "117호 다목적실",
      images: ["room117_1.jpg", "room117_2.jpg"],
    },
    window114: { title: "114호 외부 창문", images: ["window114_1.jpg"] },
    room201: {
      title: "201호 강의실",
      images: ["room201_1.jpg", "room201_2.jpg"],
    },
  };

  const record = recordDetails[id] || { title: "상세 기록", images: [] };

  return (
    <div className="record-detail-container">
      <div className="header">
        <span className="back-button" onClick={() => navigate(-1)}>
          &larr;
        </span>
        <span className="header-title">{record.title}</span>
      </div>

      {record.images.length > 0 ? (
        <div className="image-grid">
          {record.images.map((img, index) => (
            <img
              key={index}
              src={`/assets/${img}`} // 이미지 경로
              alt={`Record ${id} - ${index + 1}`}
              className="record-image"
            />
          ))}
        </div>
      ) : (
        <p className="no-data">이미지가 없습니다.</p>
      )}
    </div>
  );
};

export default RecordDetailPage;

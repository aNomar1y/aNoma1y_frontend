import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecordDetailPage.css";

const RecordDetailPage = () => {
  const { id } = useParams(); // 경로 파라미터 가져오기
  const navigate = useNavigate();

  // 상세 기록 데이터
  const recordDetails = {
    room114: {
      title: "114호 실습실",
      images: [
        { src: "room114_1.jpg", description: "2024/12/26: 의자 위치 변경" },
        { src: "room114_2.jpg", description: "2024/12/28: 화면이 켜져 있음" },
      ],
    },
    hall: {
      title: "1층 복도",
      images: [
        { src: "hall_1.jpg", description: "2024/12/24: 빈 방에 불 켜짐" },
        { src: "hall_2.jpg", description: "2024/12/25: 복도 끝 거수자 발견" },
      ],
    },
    store: {
      title: "매점",
      images: [
        { src: "store_1.jpg", description: "2024/12/25: 매점 물건 사라짐" },
        { src: "store_2.jpg", description: "2024/12/29: 매점 벽 구멍 발견" },
      ],
    },
    room117: {
      title: "117호 다목적실",
      images: [
        { src: "room117_1.jpg", description: "2025/1/2: 의자가 뒤집힘" },
        { src: "room117_2.jpg", description: "2024/12/30: 문 밖 거수자 발견" },
      ],
    },
    window114: {
      title: "114호 외부 창문",
      images: [
        { src: "window114_1.jpg", description: "2025/1/3: 창문 밖 눈덩이" },
      ],
    },
    room201: {
      title: "201호 강의실",
      images: [
        {
          src: "room201_1.jpg",
          description: "2024/12/30: 앉아있는 거수자 발견",
        },
        { src: "room201_2.jpg", description: "2025/1/1: CCTV 화면 안 보임" },
      ],
    },
  };

  // id를 기반으로 데이터 가져오기
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
            <div key={index} className="image-item">
              <img
                src={`/assets/${img.src}`} // 이미지 경로
                alt={img.description}
                className="record-image"
              />
              <p className="image-description">{img.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">이미지가 없습니다.</p>
      )}
    </div>
  );
};

export default RecordDetailPage;

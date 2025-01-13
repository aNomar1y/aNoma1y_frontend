import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecordDetailPage.css";
import axios from "axios";

const fetchKakaoId = async (accessToken) => {
  try {
    const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const kakaoId = response.data.id; // 카카오 사용자 ID
    console.log("Kakao ID:", kakaoId);
    return kakaoId;
  } catch (error) {
    console.error("Failed to fetch Kakao ID:", error);
    return null;
  }
};



const RecordDetailPage = () => {

  const [dataList, setDataList] = useState([]); // data 리스트를 저장할 상태

  useEffect(() => {
    // API 호출 함수
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/records/get-anomaly`); // API URL 변경
        const result = await response.json();

        if (result.success) {
          setDataList(result.data); // data 리스트만 상태에 저장
        } else {
          console.error("API 호출이 성공하지 않았습니다.");
        }
      } catch (error) {
        console.error("API 호출 중 에러 발생:", error);
      }
    };
    fetchData();
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 호출

  // 데이터를 그룹별로 묶는 함수
  const groupImages = (dataList) => {
    const grouped = {};
    dataList.forEach((item) => {
      const [group, id] = item.split("-");
      if (!grouped[group]) grouped[group] = [];
      grouped[group].push(item);
    });
    return Object.values(grouped);
  };

  const groupedData = groupImages(data);


  const { id } = useParams(); // 경로 파라미터 가져오기
  const navigate = useNavigate();


// description 매핑 규칙
const descriptionMapping = {
  "1-1": "114호 실습실 - 1번 상태",
  "1-2": "114호 실습실 - 2번 상태",
  "2-1": "1층 복도 - 1번 상태",
  "2-3": "1층 복도 - 3번 상태",
  "3-1": "매점 - 1번 상태",
  "3-4": "매점 - 4번 상태",
  // 필요한 매핑 추가...
};

// description을 설정하는 함수
const getDescription = (item) => {
  return descriptionMapping[item] || `${item}에 대한 설명`; // 매핑이 없으면 기본값 사용
};



  // 상세 기록 데이터
  const recordDetails = {
    cctv_room: {
      title: "CCTV실",
      images: (groupedData[0] || []).map((item) => ({
        src: `anomaly-${item}.jpg`, // 파일명 변경
        description: getDescription(item), // 기본 설명 설정
      })),
    },
    gym: {
      title: "체력단련실",
      images: (groupedData[1] || []).map((item) => ({
        src: `anomaly-${item}.jpg`, // 파일명 변경
        description: getDescription(item), // 기본 설명 설정
      })),
    },
    outside: {
      title: "창밖",
      images: (groupedData[2] || []).map((item) => ({
        src: `anomaly-${item}.jpg`, // 파일명 변경
        description: getDescription(item), // 기본 설명 설정
      })),
    },
    room201: {
      title: "201호 강의실",
      images: (groupedData[3] || []).map((item) => ({
        src: `anomaly-${item}.jpg`, // 파일명 변경
        description: getDescription(item), // 기본 설명 설정
      })),
    },
    room117: {
      title: "117호 다목적실",
      images: (groupedData[4] || []).map((item) => ({
        src: `anomaly-${item}.jpg`, // 파일명 변경
        description: getDescription(item), // 기본 설명 설정
      })),
    },
    stairs: {
      title: "대피소 계단",
      images: (groupedData[5] || []).map((item) => ({
        src: `anomaly-${item}.jpg`, // 파일명 변경
        description: getDescription(item), // 기본 설명 설정
      })),
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

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

const accessToken = localStorage.getItem("access_token");

// Kakao ID 가져오기
const kakao_id = await fetchKakaoId(accessToken);
console.log("kakao idi id: ", kakao_id)

const RecordDetailPage = () => {

  const [dataList, setDataList] = useState([]); // data 리스트를 저장할 상태

  useEffect(() => {
    // API 호출 함수
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/records/get-anomaly/${kakao_id}`); // API URL 변경
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

  const groupedData = groupImages(dataList);


  const { id } = useParams(); // 경로 파라미터 가져오기
  const navigate = useNavigate();


// description 매핑 규칙
const descriptionMapping = {
  "1-1": "CCTV실 - 오른쪽 손 포착",
  "1-2": "CCTV실 - 보조 모니터 속 귀신 포착",
  "1-3": "CCTV실 - 텀블러 사라짐",
  "2-1": "체력단련실 - 점수판 변경",
  "2-2": "체력단련실 - 탁구채 사라짐",
  "2-3": "체력단련실 - 심판 등장",
  "3-1": "창밖 - 1번 상태",
  "3-1": "창밖 - 1번 상태",
  "3-1": "창밖 - 1번 상태",
  "4-1": "201호 강의실 - 시계 사라짐",
  "4-2": "201호 강의실 - 엎드린 사람",
  "4-3": "201호 강의실 - 모니터 켜짐",
  "5-1": "117호 다목적실 - 시점 변경",
  "5-2": "117호 다목적실 - 의자 정리",
  "5-3": "117호 다목적실 - 서 있는 사람",
  "6-1": "대피소 계단 - 쳐다보는 사람",
  "6-2": "대피소 계단 - 문 열림",
  "6-3": "대피소 계단 - 빗자루",
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

import React, { useEffect, useState } from "react";
import "./MainPage.css"; // CSS 파일 가져오기
import logo from "./assets/MainPage/aNoma1y.png";
import mission from "./assets/MainPage/mission.png";
import record from "./assets/MainPage/record.png";
import logout from "./assets/MainPage/logout.png";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


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

const MainPage = () => {

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("access_token");

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);

      // URL에서 access_token 제거
      queryParams.delete("access_token");
      const newUrl = `${window.location.pathname}`;
      window.history.replaceState({}, "", newUrl);

      console.log("Access token saved:", accessToken);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const kakaoId = await fetchKakaoId(accessToken);
      console.log('kakao_id: ', kakaoId)
      await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/kakao/logout`, { kakao_id: kakaoId }); // 로그아웃 API 호출
      alert('로그아웃 성공');
      localStorage.removeItem("access_token"); // 토큰 제거
      navigate('/'); // 로그아웃 후 홈으로 이동
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 실패');
    }
  };

  return (
  <div className="container">
    <img src={logo} alt="로고" />
    <img src={mission} alt="mission" className="button-image" onClick={() => navigate('/game')}/>
    <img src={record} alt="record" className="button-image" onClick={() => navigate('/record')}/>
    <img src={logout} alt="logout" className="logout-image" onClick={handleLogout} />
  </div>
  );
};

export default MainPage;


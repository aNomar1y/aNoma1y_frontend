import React from "react";
import "./MainPage.css"; // CSS 파일 가져오기
import logo from "./assets/MainPage/aNoma1y.png";
import mission from "./assets/MainPage/mission.png";
import record from "./assets/MainPage/record.png";
import logout from "./assets/MainPage/logout.png";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const MainPage = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/auth/kakao/logout', { kakao_id: kakaoId }); // 로그아웃 API 호출
      alert('로그아웃 성공');
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

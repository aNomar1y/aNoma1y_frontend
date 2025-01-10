import React from 'react';
import './MainPage.css'; // CSS 파일 가져오기
import logo from './assets/MainPage/aNoma1y.png';
import mission from './assets/MainPage/mission.png';


const MainPage = () => (
  <div className="container">
    <img src={logo} alt="로고" />
    <img src={mission} alt="mission" />
  </div>
);

export default MainPage;
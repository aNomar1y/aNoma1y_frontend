import React from "react";
import "./MainPage.css"; // CSS 파일 가져오기
import logo from "./assets/MainPage/aNoma1y.png";
import mission from "./assets/MainPage/mission.png";
import record from "./assets/MainPage/record.png";
import logout from "./assets/MainPage/logout.png";
import { Link } from "react-router-dom";

const MainPage = () => (
  <div className="container">
    <img src={logo} alt="로고" />
    <img src={mission} alt="mission" />
    <img src={record} alt="record" />
    <img src={logout} alt="logout" />
    <Link to="/login">Go to Login</Link>
  </div>
);

export default MainPage;

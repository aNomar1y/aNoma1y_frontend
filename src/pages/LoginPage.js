import React, {useState} from "react";
import "./LoginPage.css"; // CSS 파일 import
import kakaoLoginButton from "./assets/LoginPage/kakao_login_medium_wide.png";
import { useNavigate } from "react-router";


const API_BASE_URL = process.env.REACT_APP_BASE_URL;

function LoginPage({ onPlayBgm }) {
  const navigate = useNavigate();
  const [bgmStarted, setBgmStarted] = useState(false);

  const handleStartBgm = () => {
    setBgmStarted(true);
    onPlayBgm(true); // 부모 컴포넌트(App.js)로 BGM 재생 요청
  };


  const handleKakaoLogin = () => {
    console.log('dho dksehlsmsrjdi')
    window.location.href = `${API_BASE_URL}/auth/kakao`;
  };

  return (
    <div className="login-page">
      {/* 중앙 로고 텍스트 */}
      <h1>
        a<span>N</span>oma<span>1</span>y
      </h1>

      {!bgmStarted && (
        <button onClick={handleStartBgm} className="bgm-start-button">
          Start BGM
        </button>
      )}

      {/* 카카오 로그인 버튼 */}
      <img
        src={kakaoLoginButton}
        alt="카카오로 로그인"
        onClick={handleKakaoLogin}
        className="kakao-login-button"
      />
    </div>
  );
}

export default LoginPage;

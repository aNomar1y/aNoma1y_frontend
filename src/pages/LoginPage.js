import React from "react";
import "./LoginPage.css"; // CSS 파일 import

import kakaoLoginButton from "/Users/sanghyuk/Documents/GitHub/aNoma1y_frontend/src/pages/assets/MainPage/kakao_login_medium_wide.png"; // PNG 파일 import

function LoginPage() {
  // 백엔드 API 주소
  const KAKAO_LOGIN_URL = "http://172.10.7.65:3000/auth/kakao";

  const handleLogin = () => {
    window.location.href = KAKAO_LOGIN_URL; // 백엔드로 리다이렉트하여 카카오 인증
  };

  return (
    <div className="login-page">
      {/* 중앙 로고 텍스트 */}
      <h1>
        a<span>N</span>oma<span>1</span>y
      </h1>

      {/* 카카오 로그인 버튼 */}
      <img
        src={kakaoLoginButton}
        alt="카카오로 로그인"
        onClick={handleLogin}
        className="kakao-login-button"
      />
    </div>
  );
}

export default LoginPage;

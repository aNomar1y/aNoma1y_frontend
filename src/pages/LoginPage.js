import React from "react";
import "./LoginPage.css"; // CSS 파일 import
import kakaoLoginButton from "./assets/LoginPage/kakao_login_medium_wide.png";
import { useNavigate } from "react-router";


export const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;

console.log("KAKAO_AUTH_URI:", KAKAO_AUTH_URI);
console.log("REACT_APP_API_KEY:", process.env.REACT_APP_API_KEY);
console.log("REACT_APP_REDIRECT_URI:", process.env.REACT_APP_REDIRECT_URI);

function LoginPage() {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      navigate("/home");
    } else {
      window.location.href = KAKAO_AUTH_URI;
    }
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
        onClick={handleKakaoLogin}
        className="kakao-login-button"
      />
    </div>
  );
}

export default LoginPage;

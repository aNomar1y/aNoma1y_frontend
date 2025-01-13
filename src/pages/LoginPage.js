import React, { useState } from "react";
import "./LoginPage.css"; // CSS 파일 import
import kakaoLoginButton from "./assets/LoginPage/kakao_login_medium_wide.png";
import { useNavigate } from "react-router";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

function LoginPage() {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    console.log("dho dksehlsmsrjdi");
    window.location.href = `${API_BASE_URL}/auth/kakao`;
  };

  return (
    <div className="login-page">
      <video
        src="/assets/overlay-video-1.mp4" // 동영상 경로
        className="login-noise-video-overlay"
        autoPlay
        loop
        muted
      />
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

import React, { useRef, useEffect } from "react";
import "./LoginPage.css"; // CSS 파일 import
import kakaoLoginButton from "./assets/LoginPage/kakao_login_medium_wide.png";
import { useNavigate } from "react-router";
import { useBgm } from "../BgmContext"; // 전역 BGM 상태 관리

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

function LoginPage() {
  const audioRef = useRef(null); // 클릭 소리를 제어하기 위한 ref
  const navigate = useNavigate();
  const { setCurrentBgm, setIsPlaying } = useBgm(); // 전역 BGM 상태 관리 함수

  useEffect(() => {
    setCurrentBgm("/assets/sounds/lobby.m4a"); // LoginPage 전용 BGM 설정
    setIsPlaying(true); // BGM 재생 시작
  }, [setCurrentBgm, setIsPlaying]);

  const playClickSound = () => {
    if (audioRef.current && document.body.contains(audioRef.current)) {
      console.log("Playing click sound...");
      audioRef.current.currentTime = 0; // 처음부터 재생
      audioRef.current
        .play()
        .then(() => console.log("Click sound played successfully."))
        .catch((error) => {
          console.error("Error playing click sound:", error);
        });
    } else {
      console.error("Audio element is not available or removed from the document.");
    }
  };

  const handleKakaoLogin = () => {
    console.log("Redirecting to Kakao login...");
    window.location.href = `${API_BASE_URL}/auth/kakao`;
  };

  return (
    <div className="login-page">
      <audio ref={audioRef} src="/assets/sounds/mouse-click-sound.mp3" preload="auto" />
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
        onClick={() => {
          playClickSound();
          setTimeout(() => handleKakaoLogin(), 250);
        }}
        className="kakao-login-button"
      />
    </div>
  );
}

export default LoginPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WinPage.css"; // 스타일 파일 추가

const WinPage = () => {
  const [showVideo, setShowVideo] = useState(false); // 동영상 표시 여부
  const navigate = useNavigate();

  useEffect(() => {
    // 2초 후 동영상 재생
    const videoTimer = setTimeout(() => {
      setShowVideo(true);
    }, 2000);

    // 4초 후 홈으로 이동
    const homeTimer = setTimeout(() => {
      navigate("/home");
    }, 4000);

    return () => {
      clearTimeout(videoTimer);
      clearTimeout(homeTimer); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, [navigate]);

  return (
    <div className="win-container">
      {/* 클리어 텍스트 */}
      {!showVideo && (
        <h1 className="win-text">
          수고하셨습니다. 근무시간 동안 N1을 무사히 관리하였습니다.
        </h1>
      )}

      {/* 지지직거리는 애니메이션 비디오 */}
      {showVideo && (
        <video
          className="glitch-video"
          src="/assets/overlay-video-4.mp4" // 동영상 파일 경로
          autoPlay
          muted
        />
      )}
    </div>
  );
};

export default WinPage;

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./WinPage.css"; // 스타일 파일 추가

const WinPage = () => {
  const [showVideo, setShowVideo] = useState(false); // 동영상 표시 여부
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const glitchAudioRef = useRef(null);

  useEffect(() => {
    // 2초 후 동영상 재생
    const videoTimer = setTimeout(() => {
      setShowVideo(true);
    }, 5000);

    // 4초 후 홈으로 이동
    const homeTimer = setTimeout(() => {
      navigate("/home");
    }, 7000);

    return () => {
      clearTimeout(videoTimer);
      clearTimeout(homeTimer); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, [navigate]);

  // showVideo 상태에 따라 사운드 재생을 제어
  useEffect(() => {
    // 클리어 사운드 재생
    if(!showVideo) {
      if (audioRef.current) {
        audioRef.current.loop = true;
        audioRef.current.volume = 1;
        audioRef.current.play().catch((err) => {
          console.error("audio play error:", err);
        });
      }

      //글리치 사운드 중지
      if (glitchAudioRef.current) {
        glitchAudioRef.current.pause();
        glitchAudioRef.current.currentTime = 0;
      }
    } else {
      // 글리치 사운드 재생
      if (glitchAudioRef.current) {
        glitchAudioRef.current.loop = true;
        glitchAudioRef.current.volume = 0.3;
        glitchAudioRef.current.play().catch((err) => {
          console.error("glitch sound play error:", err);
        })
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [showVideo]);
  

  return (
    <div className="win-container">
      {/* 클리어 사운드 */}
      <audio
        ref={audioRef}
        src="/assets/sounds/win-bell.mp3"
        preload="auto"
      />
      {/* 클리어 사운드 */}
      <audio
        ref={glitchAudioRef}
        src="/assets/sounds/glitch.mp3"
        preload="auto"
      />
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

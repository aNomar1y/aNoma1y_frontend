import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const BgmController = ({ shouldPlay }) => {
  const location = useLocation();
  const audioRef = useRef(null); // 오디오 요소 참조
  const typingAudioRef = useRef(null); // 추가 사운드 키보드 타이핑
  const bgmLoginMain = "/assets/sounds/lobby.m4a"; // 로그인 및 메인 BGM
  const bgmOther = "/assets/sounds/noise.m4a"; // 나머지 화면 BGM
  const bgmtyping = "/assets/sounds/keyboard-typing.mp3";

  useEffect(() => {
    const currentPath = location.pathname;

    if (audioRef.current) {
      // 경로에 따라 BGM 변경
      let newSrc;
      if (currentPath === "/" || currentPath === "/home" || currentPath === "/rule" || currentPath === "/rulenext") {
        newSrc = bgmLoginMain;
      } else {
        newSrc = bgmOther;
      }

      if(audioRef.current.src !== window.location.origin + newSrc) {
        audioRef.current.src = newSrc;
      }

      // BGM 재생 제어
      if (shouldPlay) {
        audioRef.current.play().catch((err) => {
          console.error("BGM Play Error:", err); // 재생 오류 로그
        });
      } else {
        audioRef.current.pause();
      }
    }

    if (typingAudioRef.current) {
      if(currentPath === "/rule") {
        typingAudioRef.current.src = bgmtyping;
        typingAudioRef.current.play().catch((err) => {
          console.error("Typing Sound play error", err);
        });
      } else {
        typingAudioRef.current.pause();
        typingAudioRef.current.currentTime = 0;
      }
    }
  }, [location.pathname, shouldPlay]); // 경로 또는 shouldPlay 값이 변경될 때 실행

  return (
    <>
    <audio ref={audioRef} loop />
    <audio ref={typingAudioRef} />
    </>
  );
};

export default BgmController;
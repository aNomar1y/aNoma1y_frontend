import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const BgmController = ({ shouldPlay }) => {
  const location = useLocation();
  const audioRef = useRef(null); // 오디오 요소 참조
  const bgmLoginMain = "/assets/sounds/lobby.m4a"; // 로그인 및 메인 BGM
  const bgmOther = "/assets/sounds/noise.m4a"; // 나머지 화면 BGM

  useEffect(() => {
    const currentPath = location.pathname;

    if (audioRef.current) {
      let newSrc;
      if (currentPath === "/" || currentPath === "/home" ||
        currentPath === "/rule" || currentPath === "/rulenext" ||
        currentPath === "/record") {
        newSrc = bgmLoginMain;
      } else {
        newSrc = bgmOther;
      }

      // 현재 경로와 src가 동일한 경우 변경하지 않음
      if (audioRef.current.src !== window.location.origin + newSrc) {
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
  }, [location.pathname, shouldPlay]); // 경로 또는 shouldPlay 값이 변경될 때 실행

  return <audio ref={audioRef} loop />;
};

export default BgmController;
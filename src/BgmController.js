import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useBgm } from "./BgmContext";

const BgmController = () => {
  const audioRef = useRef(null);
  const { isPlaying, setIsPlaying, currentBgm, setCurrentBgm } = useBgm();
  const location = useLocation();
  const previousBgm = useRef(null);

  useEffect(() => {
    // 현재 경로에 따라 BGM 설정
    const determineBgm = () => {
      const loginAndMainBgm = "/assets/sounds/lobby.m4a"; // Login, Main, Rule 관련 BGM
      const otherBgm = "/assets/sounds/noise.m4a"; // 나머지 페이지 BGM

      if (
        location.pathname === "/" ||
        location.pathname === "/home" ||
        location.pathname === "/rule" ||
        location.pathname === "/rulenext" ||
        location.pathname === "/record" ||
        location.pathname === "/cctv_room" ||
        location.pathname === "/gym" ||
        location.pathname === "/outside" ||
        location.pathname === "/room201" ||
        location.pathname === "/room117"||
        location.pathname === "/stairs"
      ) {
        return loginAndMainBgm;
      } else {
        return otherBgm;
      }
    };

    const newBgm = determineBgm();

    // BGM이 변경되었을 때만 업데이트
    if (previousBgm.current !== newBgm) {
      console.log(`BGM 변경 감지: ${newBgm}`);
      setCurrentBgm(newBgm); // 전역 상태 업데이트
      previousBgm.current = newBgm; // 이전 BGM 업데이트
    }
  }, [location.pathname, setCurrentBgm]);

  useEffect(() => {
    if (audioRef.current) {
      // BGM 파일이 설정되지 않은 경우 방어 로직 추가
      if (!currentBgm) {
        console.error("currentBgm 값이 비어 있습니다. 재생할 파일이 없습니다.");
        return;
      }

      // BGM 파일이 변경되었을 때만 src 업데이트
      if (audioRef.current.src !== `${window.location.origin}${currentBgm}`) {
        audioRef.current.src = currentBgm;
        console.log(`audioRef.src 업데이트: ${currentBgm}`);
      }

      // LoginPage에서만 무음으로 시작
      if (location.pathname === "/") {
        audioRef.current.volume = 0;
      } else {
        audioRef.current.volume = 1;
      }

      // 재생 상태에 따라 재생/정지 처리
      if (isPlaying) {
        audioRef.current.play()
          .then(() => console.log("BGM 재생 성공"))
          .catch((err) => console.error("BGM Play Error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentBgm, location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "b") {
        console.log("B 키가 눌렸습니다. BGM 볼륨 복원 및 처음부터 재생");
        if (audioRef.current) {
          audioRef.current.currentTime = 0; // 음악을 처음부터 시작
          audioRef.current.volume = 1; // 볼륨 복원
          setIsPlaying(true);
          audioRef.current.play().catch((err) => console.error("BGM Play Error:", err));
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsPlaying]);

  return <audio ref={audioRef} loop />;
};

export default BgmController;

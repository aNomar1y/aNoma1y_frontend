import React, { useState, useEffect, useRef } from "react";
import "./MainPage.css";
import logo from "./assets/MainPage/aNoma1y.png";
import mission from "./assets/MainPage/mission.png";
import record from "./assets/MainPage/record.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SettingsPage from "../components/SettingsPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useBgm } from "../BgmContext"; // 전역 BGM 상태를 사용하기 위해 추가

async function updateAccessTokenInDB(kakaoId, accessToken) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/kakao/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ kakaoId, accessToken }),
      }
    );
    const result = await response.json();
    console.log("Access token updated:", result);
  } catch (error) {
    console.error("Failed to update access token in DB:", error);
  }
}

const fetchKakaoId = async (accessToken) => {
  try {
    const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const kakaoId = response.data.id;
    console.log("Kakao ID:", kakaoId);
    return kakaoId;
  } catch (error) {
    console.error("Failed to fetch Kakao ID:", error);
    return null;
  }
};

const MainPage = ({ onPlayBgm }) => {
  const navigate = useNavigate();
  const audioRef = useRef(null); // 클릭 소리를 제어하기 위한 ref
  const { setCurrentBgm, setIsPlaying } = useBgm(); // 전역 BGM 상태 관리

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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

  useEffect(() => {
    console.log("Audio Ref:", audioRef.current);

    // 카카오 로그인 토큰 처리
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("access_token");

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      fetchKakaoId(accessToken).then((kakaoId) => {
        if (kakaoId) {
          updateAccessTokenInDB(kakaoId, accessToken);
          console.log("Access token saved:", accessToken, kakaoId);
        }
      });

      queryParams.delete("access_token");
      const newUrl = `${window.location.pathname}`;
      window.history.replaceState({}, "", newUrl);
    }

    // MainPage 전용 BGM 설정 및 재생
    setCurrentBgm("/assets/sounds/lobby.m4a"); // MainPage 전용 BGM
    setIsPlaying(true); // BGM 재생
  }, [setCurrentBgm, setIsPlaying]);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const kakaoId = await fetchKakaoId(accessToken);
      console.log("kakao_id: ", kakaoId);
      await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/kakao/logout`, {
        kakao_id: kakaoId,
      });
      alert("로그아웃 성공");
      localStorage.removeItem("access_token");
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 실패");
    }
  };

  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const kakaoId = await fetchKakaoId(accessToken);
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/auth/kakao/delete`,
        {
          data: { kakao_id: kakaoId, accessToken: accessToken },
        }
      );
      alert("회원탈퇴 성공");
      localStorage.removeItem("access_token");
      navigate("/");
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      alert("회원탈퇴 실패");
    }
  };

  const handleToggleMusic = () => {
    onPlayBgm((prev) => !prev); // 음악 상태 토글
  };

  return (
    <div className="container">
      <video
        src="/assets/overlay-video-3.mp4"
        className="main-noise-video-overlay"
        autoPlay
        loop
        muted
      />
      <img src={logo} alt="로고" />
      {/* 톱니바퀴 버튼 */}
      <FontAwesomeIcon
        icon={faCog}
        className="settings-icon"
        onClick={() => {
          playClickSound(); // 클릭 소리 재생
          setIsSettingsOpen(true);
        }}
      />
      {isSettingsOpen && (
        <SettingsPage
          onClose={() => {
            playClickSound(); // 클릭 소리 재생
            setIsSettingsOpen(false);
          }}
          onLogout={handleLogout}
          onDelete={handleDelete}
          onToggleMusic={handleToggleMusic}
        />
      )}
      <div className="space-between"></div>
      <audio ref={audioRef} src="/assets/sounds/mouse-click-sound.mp3" preload="auto" />
      <img
        src={mission}
        alt="mission"
        className="button-image"
        onClick={() => {
          playClickSound(); // 클릭 소리 재생
          setTimeout(() => navigate("/rule"), 250);
        }}
      />
      <img
        src={record}
        alt="record"
        className="button-image"
        onClick={() => {
          playClickSound(); // 클릭 소리 재생
          setTimeout(() => navigate("/record"), 250);
        }}
      />
    </div>
  );
};

export default MainPage;

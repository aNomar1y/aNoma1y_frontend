import React, { useEffect, useState } from "react";
import "./MainPage.css"; // CSS 파일 가져오기
import logo from "./assets/MainPage/aNoma1y.png";
import mission from "./assets/MainPage/mission.png";
import record from "./assets/MainPage/record.png";
import logout from "./assets/MainPage/logout.png";
import delete1 from "./assets/MainPage/delete.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    const kakaoId = response.data.id; // 카카오 사용자 ID
    console.log("Kakao ID:", kakaoId);
    return kakaoId;
  } catch (error) {
    console.error("Failed to fetch Kakao ID:", error);
    return null;
  }
};

const MainPage = ({ onPlayBgm }) => {
  const [userInfo, setUserInfo] = useState(null);

  const [bgmStarted, setBgmStarted] = useState(false);
  
    const handleStartBgm = () => {
      setBgmStarted(true);
      onPlayBgm(true); // 부모 컴포넌트(App.js)로 BGM 재생 요청
    };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("access_token");

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      fetchKakaoId(accessToken).then((kakaoId) => {
        if (kakaoId) {
          updateAccessTokenInDB(kakaoId, accessToken);
        }
      });

      // URL에서 access_token 제거
      queryParams.delete("access_token");
      const newUrl = `${window.location.pathname}`;
      window.history.replaceState({}, "", newUrl);

      console.log("Access token saved:", accessToken);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const kakaoId = await fetchKakaoId(accessToken);
      console.log("kakao_id: ", kakaoId);
      await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/kakao/logout`, {
        kakao_id: kakaoId,
      }); // 로그아웃 API 호출
      alert("로그아웃 성공");
      localStorage.removeItem("access_token"); // 토큰 제거
      navigate("/"); // 로그아웃 후 홈으로 이동
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 실패");
    }
  };

  const handleDelete = async () => {
    try {
      console.log("start");
      const accessToken = localStorage.getItem("access_token");
      console.log("start", accessToken);
      const kakaoId = await fetchKakaoId(accessToken);
      console.log("start", kakaoId);
      console.log("accessToken: ", accessToken);
      console.log("kakao_id: ", kakaoId);
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/auth/kakao/delete`,
        {
          data: { kakao_id: kakaoId, accessToken: accessToken },
        }
      );
      alert("회원탈퇴 성공");
      localStorage.removeItem("access_token"); // 토큰 제거
      navigate("/"); // 로그아웃 후 홈으로 이동
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      alert("회원탈퇴 실패");
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="로고" />
      {!bgmStarted && (
        <span
          className="music-icon"
          onClick={handleStartBgm}
        >
          ♫
        </span>
      )}
      <img
        src={mission}
        alt="mission"
        className="button-image"
        onClick={() => navigate("/rule")}
      />
      <img
        src={record}
        alt="record"
        className="button-image"
        onClick={() => navigate("/record")}
      />
      <img
        src={logout}
        alt="logout"
        className="logout-image"
        onClick={handleLogout}
      />
      <img
        src={delete1}
        alt="delete"
        className="delete-image"
        onClick={handleDelete}
      />
    </div>
  );
};

export default MainPage;

import React from "react";
import { useNavigate } from "react-router-dom";
//import { logout } from "../api/api"; // 로그아웃 API 함수

function Header() {
  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   const ok = await logout(); // 백엔드로 로그아웃 POST 요청
  //   if (ok) {
  //     // 로컬 스토리지 토큰 제거 등
  //     navigate("/login");
  //   } else {
  //     alert("로그아웃 실패");
  //   }
  // };

  return (
    <header style={{ backgroundColor: "#460000", padding: "10px" }}>
      <h2>aNoma1y</h2>
      {/*<button onClick={handleLogout}>로그아웃</button>*/}
    </header>
  );
}

export default Header;

import React from "react";
import { withdraw } from "../api/authAPI";

function SettingsPage() {
  const handleWithdraw = async () => {
    const ok = await withdraw();
    if (ok) {
      alert("회원탈퇴 완료!");
      // 토큰 제거, 로그인 페이지 등으로 이동
      window.location.replace("/login");
    } else {
      alert("회원탈퇴 실패");
    }
  };

  return (
    <div>
      <h2>설정 페이지</h2>
      <button onClick={handleWithdraw}>카카오 회원 탈퇴</button>
    </div>
  );
}

export default SettingsPage;

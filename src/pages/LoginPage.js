import React from "react";

function LoginPage() {
  // 백엔드 API 주소
  const KAKAO_LOGIN_URL = "http://172.10.65:3000/auth/kakao";

  const handleLogin = () => {
    window.location.href = KAKAO_LOGIN_URL; // 백엔드로 리다이렉트하여 카카오 인증
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>로그인 페이지</h1>
      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        카카오로 로그인
      </button>
    </div>
  );
}

export default LoginPage;

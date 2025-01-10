import React from "react";

function LoginPage() {
  // 백엔드 API 주소
  const KAKAO_LOGIN_URL = "http://172.10.7.65:3000/auth/kakao";

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>로그인 페이지</h1>
      <button onClick={handleKakaoLogin} style={{ padding: "10px 20px" }}>
        카카오로 로그인
      </button>
    </div>
  );
}

export default LoginPage;

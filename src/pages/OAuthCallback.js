import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setToken } from "../utils/tokenManager";

function OAuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 백엔드에서 리다이렉트된 URL: http://localhost:3000/oauth?token=abcd1234
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      setToken(token);
      // 토큰 저장 후 메인 페이지로 이동
      navigate("/");
    } else {
      alert("로그인에 실패했습니다.");
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>카카오 인증 처리중...</div>;
}

export default OAuthCallback;

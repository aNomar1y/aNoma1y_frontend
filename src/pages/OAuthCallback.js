import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OAuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code"); // URL에서 code 추출

    if (code) {
      // 인증 코드를 백엔드로 POST 요청
      fetch("http://localhost:3000/auth/kakao/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }), // 인증 코드 전송
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.accessToken) {
            // 액세스 토큰 및 사용자 정보 저장
            localStorage.setItem("authToken", data.accessToken);
            localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
            alert(`환영합니다, ${data.userInfo.properties.nickname}님!`);
            navigate("/"); // 메인 페이지로 이동
          } else {
            alert("로그인에 실패했습니다.");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Error during authentication:", error);
          alert("로그인 처리 중 오류가 발생했습니다.");
          navigate("/login");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert("인증 코드가 없습니다.");
      navigate("/login");
      setLoading(false);
    }
  }, [location, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {loading ? (
        <h1>카카오 인증 처리중...</h1>
      ) : (
        <h1>처리가 완료되었습니다.</h1>
      )}
    </div>
  );
}

export default OAuthCallback;

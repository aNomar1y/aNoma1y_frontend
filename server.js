const express = require("express");
const path = require("path");
const app = express();

// React 정적 파일 제공
app.use(express.static(path.join(__dirname, "dist")));

// SPA 라우팅: 모든 경로를 index.html로 처리
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 서버 실행
const PORT = 3000;
const HOST = "172.10.7.65"; // 모든 네트워크 인터페이스에서 요청 수신
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

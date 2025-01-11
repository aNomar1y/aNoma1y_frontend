import React from "react";
// import { Routes, Route } from "react-router-dom";

// 개발용
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import OAuthCallback from "../pages/OAuthCallback";
import GameMainPage from "../pages/GameMainPage";
import SettingsPage from "../pages/SettingsPage";
import RulePage from "../pages/RulePage";
import RuleNextPage from "../pages/RuleNextPage";
import MainPage from "../pages/MainPage";
import RecordPage from "../pages/RecordPage";
import RecordDetailPage from "../pages/RecordDetailPage";

function RoutesIndex() {
  return (
    <div>
      {/* 네비게이션 바 */}
      <nav>
        <Link to="/">login</Link> |
        <Link to="/home">Home</Link> |
        <Link to="/record">record</Link> |
        <Link to="/game">game</Link> |
        <Link to="/oauth">oauth</Link> |
        <Link to="/settings">settings</Link> |
        <Link to="/rule">rule</Link> |
        <Link to="/rulenext">rulenext</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/:id" element={<RecordDetailPage />} />
        <Route path="/game" element={<GameMainPage />} />
        <Route path="/auth/kakao/callback" element={<OAuthCallback />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/rule" element={<RulePage />} />
        <Route path="/rulenext" element={<RuleNextPage />} />

        {/* 필요한 라우트 추가 */}
      </Routes>
    </div>
  );
}

export default RoutesIndex;

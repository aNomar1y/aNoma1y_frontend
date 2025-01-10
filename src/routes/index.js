import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import OAuthCallback from "../pages/OAuthCallback";
import GameMainPage from "../pages/GameMainPage";
import SettingsPage from "../pages/SettingsPage";
import RulePage from "../pages/RulePage";
import RuleNextPage from "../pages/RuleNextPage";
import MainPage from "../pages/MainPage"

function RoutesIndex() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/" element={<GameMainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth" element={<OAuthCallback />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/rule" element={<RulePage />} />
      <Route path="/rulenext" element={<RuleNextPage />} />
      {/* 필요한 라우트 추가 */}
    </Routes>
  );
}

export default RoutesIndex;
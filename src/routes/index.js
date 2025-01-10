import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import OAuthCallback from "../pages/OAuthCallback";
import MainPage from "../pages/MainPage";
import SettingsPage from "../pages/SettingsPage";

function RoutesIndex() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth" element={<OAuthCallback />} />
      <Route path="/settings" element={<SettingsPage />} />
      {/* 필요한 라우트 추가 */}
    </Routes>
  );
}

export default RoutesIndex;

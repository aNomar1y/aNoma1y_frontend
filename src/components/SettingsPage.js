import React from "react";
import "./SettingsPage.css";

const SettingsPage = ({ onClose, onLogout, onDelete, onToggleMusic }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
      {/* 닫기 버튼 */}
      <button className="popup-close" onClick={onClose}>X</button>
      
      <h2>관리 메뉴</h2>

      {/* 로그아웃 및 회원탈퇴: 텍스트 형태 */}
      <span className="interactive-text" onClick={onLogout}>로그아웃</span>
      <span className="interactive-text" onClick={onDelete}>회원탈퇴</span>

      {/* 음악 컨트롤: 버튼 형태 */}
      <button className="music-button" onClick={onToggleMusic}>
        음악 컨트롤
      </button>
      </div>
    </div>
  );
};

export default SettingsPage;

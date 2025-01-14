import React from "react";
import "./SettingsPage.css";

const SettingsPage = ({ onClose, onLogout, onDelete, onToggleMusic }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>
          X
        </button>
        <h2>관리 메뉴</h2>
        <button onClick={onLogout}>로그아웃</button>
        <button onClick={onDelete}>회원탈퇴</button>
        <button onClick={onToggleMusic}>음악 컨트롤</button>
      </div>
    </div>
  );
};

export default SettingsPage;

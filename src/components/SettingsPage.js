import React, { useState } from "react";
import "./SettingsPage.css";

const SettingsPage = ({ onClose, onLogout, onDelete, onToggleMusic }) => {
  const [isMusicOn, setIsMusicOn] = useState(false); // 음악 상태 관리

  const handleMusicToggle = () => {
    setIsMusicOn((prevState) => !prevState); // 상태 전환
    onToggleMusic(); // 상위 컴포넌트로 상태 전달
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* 닫기 버튼 */}
        <button className="popup-close" onClick={onClose}>
          X
        </button>

        <h2>관리 메뉴</h2>

        {/* 로그아웃: 텍스트 형태 */}
        <span className="interactive-text" onClick={onLogout}>
          로그아웃
        </span>

        {/* 회원탈퇴: 텍스트 형태 */}
        <span className="interactive-text" onClick={onDelete}>
          회원탈퇴
        </span>

        {/* 음악 컨트롤: 상태에 따라 버튼 변경 */}
        {isMusicOn ? (
          <button className="music-button" onClick={handleMusicToggle}>
            음악 끄기
          </button>
        ) : (
          <button className="music-button" onClick={handleMusicToggle}>
            음악 켜기
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;

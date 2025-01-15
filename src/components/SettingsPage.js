import React from "react";
import "./SettingsPage.css";
import { useBgm } from "../BgmContext"; // 전역 BGM 상태 사용

const SettingsPage = ({ onClose, onLogout, onDelete }) => {
  const { isPlaying, setIsPlaying } = useBgm(); // 전역 BGM 상태 참조 및 업데이트

  const handleMusicToggle = () => {
    setIsPlaying((prev) => !prev); // 전역 상태에서 음악 상태 전환
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

        {/* 음악 컨트롤: 전역 상태 기반으로 UI 변경 */}
        {isPlaying ? (
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

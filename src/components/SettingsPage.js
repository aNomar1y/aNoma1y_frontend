import React, {useRef} from "react";
import "./SettingsPage.css";
import { useBgm } from "../BgmContext"; // 전역 BGM 상태 사용

const SettingsPage = ({ onClose, onLogout, onDelete }) => {

  const audioRef = useRef(null); // 클릭 소리를 제어하기 위한 ref
      
  const playClickSound = () => {
    if (audioRef.current && document.body.contains(audioRef.current)) {
      console.log("Playing click sound...");
      audioRef.current.currentTime = 0; // 처음부터 재생
      audioRef.current
        .play()
        .then(() => console.log("Click sound played successfully."))
        .catch((error) => {
          console.error("Error playing click sound:", error);
        });
    } else {
      console.error("Audio element is not available or removed from the document.");
    }
  };

  const { isPlaying, setIsPlaying } = useBgm(); // 전역 BGM 상태 참조 및 업데이트

  const handleMusicToggle = () => {
    setIsPlaying((prev) => !prev); // 전역 상태에서 음악 상태 전환
  };

  return (
    <div className="popup-overlay">
      <audio ref={audioRef} src="/assets/sounds/mouse-click-sound.mp3" preload="auto" />
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
          <button className="music-button" onClick={() => {
              playClickSound();
              handleMusicToggle();
            }}>
            음악 끄기
          </button>
        ) : (
          <button className="music-button" onClick={() => {
            playClickSound();
            handleMusicToggle();
          }}>
            음악 켜기
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;

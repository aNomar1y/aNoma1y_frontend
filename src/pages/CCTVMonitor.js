import React, { useState, useEffect } from "react";
import "./CCTVMonitor.css";

const CCTVMonitor = () => {
  const [cctvData, setCctvData] = useState([
    {
      id: 1,
      anomalies: ["1-1", "1-2", "1-3"],
      currentAnomaly: null,
      isAdjusting: false,
    },
    {
      id: 2,
      anomalies: ["2-1", "2-2", "2-3"],
      currentAnomaly: null,
      isAdjusting: false,
    },
    {
      id: 3,
      anomalies: ["3-1", "3-2", "3-3"],
      currentAnomaly: null,
      isAdjusting: false,
    },
    {
      id: 4,
      anomalies: ["4-1", "4-2", "4-3"],
      currentAnomaly: null,
      isAdjusting: false,
    },
    {
      id: 5,
      anomalies: ["5-1", "5-2", "5-3"],
      currentAnomaly: null,
      isAdjusting: false,
    },
    {
      id: 6,
      anomalies: ["6-1"],
      currentAnomaly: null,
      isAdjusting: false,
    },
  ]);

  const [currentScreen, setCurrentScreen] = useState(0);

  // 랜덤 이상현상 발생 (5초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      setCctvData((prevData) => {
        const availableScreens = prevData.filter(
          (_, index) => index !== currentScreen
        );
        const randomScreen =
          availableScreens[Math.floor(Math.random() * availableScreens.length)];
        const availableAnomalies = randomScreen.anomalies.filter(
          (anomaly) => anomaly !== randomScreen.currentAnomaly
        );
        const newAnomaly =
          availableAnomalies[
            Math.floor(Math.random() * availableAnomalies.length)
          ] || null;

        return prevData.map((screen) =>
          screen.id === randomScreen.id
            ? { ...screen, currentAnomaly: newAnomaly }
            : screen
        );
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentScreen]);

  // 화면 전환: 다음 화면
  const handleNextScreen = () => {
    setCurrentScreen((prevScreen) => (prevScreen + 1) % cctvData.length); // 순환
  };

  // 화면 전환: 이전 화면
  const handlePreviousScreen = () => {
    setCurrentScreen((prevScreen) =>
      prevScreen === 0 ? cctvData.length - 1 : prevScreen - 1
    );
  };

  // 이상현상 보고 기능
  const reportAnomaly = () => {
    const screen = cctvData[currentScreen];
    if (!screen.currentAnomaly) {
      alert("이상현상이 발생하지 않았습니다.");
      return;
    }

    // 이상현상 보고 후 정상 화면으로 복귀
    setCctvData((prevData) =>
      prevData.map((screen) =>
        screen.id === cctvData[currentScreen].id
          ? { ...screen, isAdjusting: true, currentAnomaly: null }
          : screen
      )
    );

    // 이상현상 보고 후 1.5초 동안 화면 조정 중 표시
    setTimeout(() => {
      setCctvData((prevData) =>
        prevData.map((screen) =>
          screen.id === cctvData[currentScreen].id
            ? { ...screen, isAdjusting: false }
            : screen
        )
      );
    }, 1500);
  };

  return (
    <div className="monitor-container">
      <div className="screen-header">
        <span>CAM {cctvData[currentScreen].id}: 114호 실습실</span>
        <span>{new Date().toLocaleString()}</span>
      </div>
      <div className="cctv-screen">
        {cctvData[currentScreen].isAdjusting ? (
          <div className="adjusting-screen">화면 조정 중...</div>
        ) : (
          <img
            src={
              cctvData[currentScreen].currentAnomaly
                ? `/assets/anomaly-${cctvData[currentScreen].currentAnomaly}.jpg`
                : `/assets/cctv${cctvData[currentScreen].id}.jpg`
            }
            alt={`CCTV ${cctvData[currentScreen].id}`}
            onError={(e) => (e.target.src = "default.jpg")} // 이미지 로드 실패 시 기본 이미지
          />
        )}
        <button className="arrow left-arrow" onClick={handlePreviousScreen}>
          &#9664;
        </button>
        <button className="arrow right-arrow" onClick={handleNextScreen}>
          &#9654;
        </button>
      </div>
      <button className="report-button" onClick={reportAnomaly}>
        보고하기
      </button>
    </div>
  );
};

export default CCTVMonitor;

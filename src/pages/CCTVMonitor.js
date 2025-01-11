import React, { useState, useEffect, useRef } from "react";
import "./CCTVMonitor.css";
import { useNavigate } from "react-router-dom";

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
      anomalies: ["6-1", "6-2", "6-3"],
      currentAnomaly: null,
      isAdjusting: false,
    },
  ]);

  const [currentScreen, setCurrentScreen] = useState(0);
  const currentScreenRef = useRef(currentScreen); // 최신 currentScreen 값을 저장
  const [showWarning, setShowWarning] = useState(false); // 상단 경고문 표시 상태
  const [anomalyActive, setAnomalyActive] = useState(false); // 이상현상 활성화 상태
  const [wrongReports, setWrongReports] = useState(0); // 잘못 보고한 횟수
  const [isStatic, setIsStatic] = useState(false); // 지지직 효과 상태
  const navigate = useNavigate(); // React Router의 useNavigate
  const anomalyCount = cctvData.filter(
    (screen) => screen.currentAnomaly !== null
  ).length; // 이상현상 개수

  // 랜덤 이상현상 발생 (10초마다)
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      setCctvData((prevData) => {
        const availableScreens = prevData.filter(
          (screen, index) =>
            index !== currentScreen && screen.currentAnomaly === null
        ); // 현재 화면 제외
        console.log(
          "Available Screens:",
          availableScreens.map((s) => s.id)
        );
        const randomScreen =
          availableScreens[Math.floor(Math.random() * availableScreens.length)];
        const availableAnomalies = randomScreen.anomalies.filter(
          (anomaly) => anomaly !== randomScreen.currentAnomaly
        );
        console.log("Available Anomalies for Screen:", availableAnomalies);
        const newAnomaly =
          availableAnomalies[
            Math.floor(Math.random() * availableAnomalies.length)
          ] || null;
        console.log("Generated Anomaly:", newAnomaly);
        return prevData.map((screen) =>
          screen.id === randomScreen.id
            ? { ...screen, currentAnomaly: newAnomaly }
            : screen
        );
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  */
  // 화면 전환: 다음 화면
  const handleNextScreen = () => {
    setCurrentScreen((prevScreen) => {
      const newScreen = (prevScreen + 1) % cctvData.length;
      currentScreenRef.current = newScreen; // 최신 값 업데이트
      return newScreen;
    });
  };
  const handlePreviousScreen = () => {
    setCurrentScreen((prevScreen) => {
      const newScreen = prevScreen === 0 ? cctvData.length - 1 : prevScreen - 1;
      currentScreenRef.current = newScreen; // 최신 값 업데이트
      return newScreen;
    });
  };

  // 이상현상 발생 로직
  useEffect(() => {
    let interval;
    const startAnomalies = () => {
      interval = setInterval(() => {
        setCctvData((prevData) => {
          const availableScreens = prevData.filter(
            (screen, index) =>
              index !== currentScreenRef.current &&
              screen.currentAnomaly === null
          );

          if (availableScreens.length === 0) {
            console.warn("No available screens for anomaly generation.");
            return prevData;
          }

          const randomScreen =
            availableScreens[
              Math.floor(Math.random() * availableScreens.length)
            ];

          const availableAnomalies = randomScreen.anomalies.filter(
            (anomaly) => anomaly !== randomScreen.currentAnomaly
          );

          if (availableAnomalies.length === 0) {
            console.warn(
              `No anomalies available for screen ${randomScreen.id}`
            );
            return prevData;
          }

          const newAnomaly =
            availableAnomalies[
              Math.floor(Math.random() * availableAnomalies.length)
            ];

          console.log(
            `New anomaly generated for CAM ${randomScreen.id}: ${newAnomaly}`
          );

          return prevData.map((screen) =>
            screen.id === randomScreen.id
              ? { ...screen, currentAnomaly: newAnomaly }
              : screen
          );
        });
      }, 10000); // 10초 간격으로 이상현상 발생
    };

    // 25초 후 경고문 표시
    const warningTimeout = setTimeout(() => {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 5000);
    }, 25000);

    // 30초 후 이상현상 활성화
    const anomalyTimeout = setTimeout(() => {
      setAnomalyActive(true);
      startAnomalies();
    }, 30000);

    return () => {
      clearTimeout(warningTimeout);
      clearTimeout(anomalyTimeout);
      clearInterval(interval);
    };
  }, []);
  //게임 오버 기능
  useEffect(() => {
    if (wrongReports >= 3 || anomalyCount >= 3) {
      alert("게임 오버! 시작화면으로 이동합니다.");
      navigate("/home");
    }
  }, [wrongReports, anomalyCount, navigate]);

  // 지지직 효과 주기적 발생
  useEffect(() => {
    const staticInterval = setInterval(() => {
      setIsStatic(true); // 지지직 효과 활성화
      setTimeout(() => setIsStatic(false), 500); // 0.5초 후 효과 제거
    }, 5000); // 5초마다 효과 발생
    return () => clearInterval(staticInterval);
  }, []);

  // 이상현상 보고 기능
  const reportAnomaly = () => {
    const screen = cctvData[currentScreen];
    if (!screen.currentAnomaly) {
      setWrongReports((prev) => prev + 1); // 잘못 보고한 횟수 증가
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
    }, 1000);
  };

  return (
    <div className="monitor-container">
      {showWarning && (
        <div className="warning-banner">
          경고: 이상현상이 감지될 수 있습니다. 발견 즉시 보고하십시오.
        </div>
      )}
      <div className="cctv-screen">
        <div className="screen-header">
          <span>CAM {cctvData[currentScreen].id}: 114호 실습실</span>
          <span>{new Date().toLocaleString()}</span>
          <span>발생 중인 이상현상: {anomalyCount}개</span>
          <span>잘못 보고한 횟수: {wrongReports}회</span>
        </div>
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
            className={`cctv-image ${isStatic ? "static-effect" : ""}`}
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

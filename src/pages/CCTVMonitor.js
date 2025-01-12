import React, { useState, useEffect, useRef } from "react";
import "./CCTVMonitor.css";
import { useNavigate } from "react-router-dom";

const CCTVMonitor = () => {
  const [cctvData, setCctvData] = useState([
    {
      id: 1,
      name: "114호 실습실",
      anomalies: ["1-1", "1-2", "1-3"],
      currentAnomaly: null,
    },
    {
      id: 2,
      name: "1층 매점",
      anomalies: ["2-1", "2-2", "2-3"],
      currentAnomaly: null,
    },
    {
      id: 3,
      name: "201호 강의실",
      anomalies: ["3-1", "3-2", "3-3"],
      currentAnomaly: null,
    },
    {
      id: 4,
      name: "1층 복도",
      anomalies: ["4-1", "4-2", "4-3"],
      currentAnomaly: null,
    },
    {
      id: 5,
      name: "117호 다목적실",
      anomalies: ["5-1", "5-2", "5-3"],
      currentAnomaly: null,
    },
    {
      id: 6,
      name: "대피소 계단",
      anomalies: ["6-1", "6-2", "6-3"],
      currentAnomaly: null,
    },
  ]);

  const [currentScreen, setCurrentScreen] = useState(0);
  const currentScreenRef = useRef(currentScreen); // 최신 currentScreen 값을 저장
  const [showWarning, setShowWarning] = useState(false); // 상단 경고문 표시 상태
  const [anomalyActive, setAnomalyActive] = useState(false); // 이상현상 활성화 상태
  const [wrongReports, setWrongReports] = useState(0); // 잘못 보고한 횟수
  const [alertMessage, setAlertMessage] = useState(""); // 경고 메시지 상태
  const [showAlert, setShowAlert] = useState(false);
  const [isStatic, setIsStatic] = useState(false); // 지지직 효과 상태
  const navigate = useNavigate(); // React Router의 useNavigate
  const [remainingTime, setRemainingTime] = useState(180);
  const [gameTime, setGameTime] = useState(new Date("2025-01-15T04:00:00")); // 게임 시작 시간
  const anomalyCount = cctvData.filter(
    (screen) => screen.currentAnomaly !== null
  ).length; // 이상현상 개수

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

  // 게임 속 시간 흐름 (4.09초마다 1분씩 증가)
  useEffect(() => {
    const timer = setInterval(() => {
      setGameTime((prevTime) => new Date(prevTime.getTime() + 60 * 1000)); // 1분 추가
    }, 4090); // 4.09초마다 실행

    // 3분 후 게임 종료 및 승리
    const victoryTimeout = setTimeout(() => {
      alert("승리했습니다! 로비로 돌아갑니다.");
      navigate("/home");
    }, 180000); // 3분 * 1.5초 = 4500ms

    return () => {
      clearInterval(timer); // 타이머 정리
      clearTimeout(victoryTimeout); // 승리 타임아웃 정리
    };
  }, [navigate]);

  // 날짜와 시간 포맷팅
  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}`;
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
    if (wrongReports >= 3) {
      //alert("게임 오버! 시작화면으로 이동합니다.");
      navigate("/firedtext");
    }
    if (anomalyCount >= 3) {
      navigate("/deadtext");
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

  // 경고 창 닫기
  const closeAlert = () => {
    setShowAlert(false); // 경고 창 닫기
  };

  // 이상현상 보고 기능
  const reportAnomaly = () => {
    const screen = cctvData[currentScreen];
    if (!screen.currentAnomaly) {
      setWrongReports((prev) => prev + 1); // 잘못 보고한 횟수 증가
      //alert("이상현상이 발견되지 않았습니다.");
      setAlertMessage("이상현상이 발견되지 않았습니다."); // 경고 메시지 설정
      setShowAlert(true); // 경고 창 표시
      return;
    }
    // 경고 창 닫기
    const closeAlert = () => {
      setShowAlert(false); // 경고 창 닫기
    };

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
      {showAlert && (
        <div className="alert-popup">
          <div className="alert-content">
            <div className="alert-striped-top"></div> {/* 상단 줄무늬 */}
            <p className="alert-title">WARNING</p> {/* 메시지 제목 */}
            <div className="alert-icon">⚠️</div> {/* 경고 아이콘 */}
            <p>{alertMessage}</p> {/* 메시지 본문 */}
            <button onClick={closeAlert}>확인</button>
            <div className="alert-striped-bottom"></div> {/* 하단 줄무늬 */}
          </div>
        </div>
      )}
      <div className="cctv-screen">
        <div className="screen-header">
          <div className="header-left">
            <span className="recording-indicator"></span>
            <span>
              CAM {cctvData[currentScreen].id}: {cctvData[currentScreen].name}
            </span>
          </div>
          <span>{formatDateTime(gameTime)}</span> {/* 게임 속 시간 표시 */}
        </div>
        {cctvData[currentScreen].isAdjusting ? (
          <div className="adjusting-screen">
            <div className="adjusting-banner1">
              <span>이상현상이 확인되었습니다.</span>
            </div>
            <div className="adjusting-banner2">
              <span>잠시 기다려주십시오...</span>
            </div>
          </div>
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
      <div className="wrong-reports-counter">
        잘못 보고한 횟수: {wrongReports}회
      </div>
    </div>
  );
};

export default CCTVMonitor;

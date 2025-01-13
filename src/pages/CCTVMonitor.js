import React, { useState, useEffect, useRef } from "react";
import "./CCTVMonitor.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const fetchKakaoId = async (accessToken) => {
  try {
    const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const kakaoId = response.data.id; // 카카오 사용자 ID
    console.log("Kakao ID:", kakaoId);
    return kakaoId;
  } catch (error) {
    console.error("Failed to fetch Kakao ID:", error);
    return null;
  }
};

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
      name: "체력단련실",
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
      anomalies: ["4-1", "4-2", "4-3", "4-4"],
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
  const [showTemporaryImage, setShowTemporaryImage] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180);
  const [gameTime, setGameTime] = useState(new Date("2025-01-15T04:00:00")); // 게임 시작 시간
  const audioRef = useRef(null); // 클릭 소리를 제어하기 위한 ref
  const beepAudioRef = useRef(null); // 화면조정 소리 제어를 위한 ref
  const screamingAudioRef = useRef(null); // 비명 소리 제어를 위한 ref
  const anomalyCount = cctvData.filter(
    (screen) => screen.currentAnomaly !== null
  ).length; // 이상현상 개수

  // 화면 전환: 다음 화면
  const handleNextScreen = () => {
    playClickSound(); // 소리 재생
    setCurrentScreen((prevScreen) => {
      const newScreen = (prevScreen + 1) % cctvData.length;
      currentScreenRef.current = newScreen; // 최신 값 업데이트
      return newScreen;
    });
  };
  const handlePreviousScreen = () => {
    playClickSound(); // 소리 재생
    setCurrentScreen((prevScreen) => {
      const newScreen = prevScreen === 0 ? cctvData.length - 1 : prevScreen - 1;
      currentScreenRef.current = newScreen; // 최신 값 업데이트
      return newScreen;
    });
  };
  // 클릭 소리 재생 함수
  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // 소리를 처음부터 재생
      audioRef.current.play();
    }
  };
  // 게임 속 시간 흐름 (4.09초마다 1분씩 증가)
  useEffect(() => {
    const timer = setInterval(() => {
      setGameTime((prevTime) => new Date(prevTime.getTime() + 60 * 1000)); // 1분 추가
    }, 4090); // 4.09초마다 실행

    // 3분 후 게임 종료 및 승리
    const victoryTimeout = setTimeout(() => {
      navigate("/win");
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
      }, 12000); // 12초 간격으로 이상현상 발생
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
      // 이상현상 3개 초과: /deadtext로 이동
      setShowTemporaryImage(true); // 사진 표시 활성화

      // 비명 소리 재생
      if (screamingAudioRef.current) {
        screamingAudioRef.current.currentTime = 0;
        screamingAudioRef.current.play();
      }

      setTimeout(() => {
        setShowTemporaryImage(false); // 사진 표시 비활성화

        //비명소리 정지
        if (screamingAudioRef.current) {
          screamingAudioRef.current.pause();
          screamingAudioRef.current.currentTime = 0;
        }

        navigate("/deadtext"); // 0.5초 후 /deadtext로 이동
      }, 500);
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

  // 화면 조정 중 삐- 사운드 재생
  useEffect(() => {
    if (cctvData[currentScreen].isAdjusting) {
      // 삐- 사운드 재생
      if (beepAudioRef.current) {
        beepAudioRef.current.currentTime = 0;
        beepAudioRef.current.play();
      }

      // 1초 후 사운드 정지
      const timeout = setTimeout(() => {
        if (beepAudioRef.current) {
          beepAudioRef.current.pause();
          beepAudioRef.current.currentTime = 0;
        }
      }, 1000);

      return () => {
        clearTimeout(timeout); // 정리
        if (beepAudioRef.current) {
          beepAudioRef.current.pause();
          beepAudioRef.current.currentTime = 0;
        }
      };
    }
  }, [cctvData[currentScreen].isAdjusting]);

  // 경고 창 닫기
  const closeAlert = () => {
    setShowAlert(false); // 경고 창 닫기
  };

  // 이상현상 보고 기능
  const reportAnomaly = async () => {
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

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("Access Token is missing!");
      setAlertMessage("로그인 상태를 확인해주세요."); // 경고 메시지
      setShowAlert(true); // 경고 창 표시
      return;
    }

    // Kakao ID 가져오기
    const kakaoId = await fetchKakaoId(accessToken);
    if (!kakaoId) {
      setAlertMessage("Kakao ID를 가져오지 못했습니다."); // 경고 메시지
      setShowAlert(true); // 경고 창 표시
      return;
    }

    // 성공적으로 보고한 이상현상 정보
    const reportedAnomaly = {
      kakao_id: kakaoId,
      cctv_id: screen.id,
      anomaly_id: screen.currentAnomaly,
    };

    console.log("Reported Anomaly:", reportedAnomaly);

    // 서버로 데이터 전송 (예: POST 요청)
    fetch(`${process.env.REACT_APP_BASE_URL}/records/save-anomaly`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reportedAnomaly),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Anomaly saved successfully:", data);
      })
      .catch((error) => {
        console.error("Failed to save anomaly:", error);
      });

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
      {/* 클릭 사운드 */}
      <audio
        ref={audioRef}
        src="/assets/sounds/mouse-click-sound.mp3"
        preload="auto"
      />
      {/* 화면조정 사운드 */}
      <audio ref={beepAudioRef} src="/assets/sounds/beep.mp3" preload="auto" />
      {/* 비명 사운드 */}
      <audio
        ref={screamingAudioRef}
        src="/assets/sounds/screaming.mp3"
        preload="autio"
      />
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
        <video
          src="/assets/overlay-video-2-1.mp4" // 동영상 경로
          className="noise-video-overlay"
          autoPlay
          loop
          muted
        />
        <div className="screen-header">
          <div className="header-left">
            <span className="recording-indicator"></span>
            <span>
              CAM {cctvData[currentScreen].id}: {cctvData[currentScreen].name}
            </span>
          </div>
          <span>{formatDateTime(gameTime)}</span> {/* 게임 속 시간 표시 */}
        </div>
        {showTemporaryImage ? ( // 특정 이미지를 표시하는 조건
          <img
            src="/assets/thisisit.jpg" // 특정 이미지 경로
            alt="Temporary Display"
            className="cctv-image"
          />
        ) : cctvData[currentScreen].isAdjusting ? ( // 화면 조정 중일 때
          <div className="adjusting-screen">
            <div className="adjusting-banner1">
              <span>이상현상이 확인되었습니다.</span>
            </div>
            <div className="adjusting-banner2">
              <span>잠시 기다려주십시오...</span>
            </div>
          </div>
        ) : (
          // 기본 상태: CCTV 화면 또는 이상현상
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

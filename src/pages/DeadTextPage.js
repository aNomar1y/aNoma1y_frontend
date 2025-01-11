import React from 'react';
import TypingEffect from '../components/TypingEffect'; // TypingEffect 컴포넌트 가져오기
import './DeadTextPage.css'; // DeadTextPage 전용 CSS 파일

function DeadTextPage() {
  return (
    <div className="deadtext-container">
      <div className="deadtext-content">
        <TypingEffect
          lines={[
            '관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량',
            '관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량',
            '관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량',
            '관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량',
            '관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량',
            '관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량',
            '관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량',
            '관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량',
            '관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량관리자생체신호수신불량',
          ]}
          minDelay={5} // 최소 딜레이 (ms)
          maxDelay={5} // 최대 딜레이 (ms)
        />
      </div>
    </div>
  );
}

export default DeadTextPage;

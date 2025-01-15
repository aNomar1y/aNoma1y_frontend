import React, { createContext, useState, useContext } from "react";

const BgmContext = createContext();

export const BgmProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false); // BGM 재생 여부
  const [currentBgm, setCurrentBgm] = useState(null); // 현재 재생 중인 BGM 파일 경로

  return (
    <BgmContext.Provider value={{ isPlaying, setIsPlaying, currentBgm, setCurrentBgm }}>
      {children}
    </BgmContext.Provider>
  );
};

export const useBgm = () => useContext(BgmContext);

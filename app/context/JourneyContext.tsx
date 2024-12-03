"use client";

import React, { createContext, useContext, useState } from "react";

interface JourneyContextType {
  outboundTrainId: string | null;
  returnTrainId: string | null;
  setOutboundTrainId: (id: string) => void;
  setReturnTrainId: (id: string) => void;
  handleChooseChange: (id: string) => void;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [outboundTrainId, setOutboundTrainId] = useState<string | null>(null);
  const [returnTrainId, setReturnTrainId] = useState<string | null>(null);
  console.log(outboundTrainId);

  const handleChooseChange = (id: string) => {
    setOutboundTrainId(() => id);
  };

  return (
    <JourneyContext.Provider
      value={{
        outboundTrainId,
        handleChooseChange,
        returnTrainId,
        setOutboundTrainId,
        setReturnTrainId,
      }}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourneyContext() {
  const context = useContext(JourneyContext);
  if (context === undefined) {
    throw new Error("useJourneyContext must be used within a JourneyProvider");
  }
  return context;
}

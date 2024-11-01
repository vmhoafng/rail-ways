"use client";

import React, { createContext, useState, useContext } from "react";

interface ActiveTrainState {
  trainId: string | null;
  activeTab: string | null;
}

interface ActiveTrainContextType {
  activeState: ActiveTrainState;
  setActiveState: (state: ActiveTrainState) => void;
}

const ActiveTrainContext = createContext<ActiveTrainContextType | undefined>(
  undefined
);

export function ActiveTrainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeState, setActiveState] = useState<ActiveTrainState>({
    trainId: null,
    activeTab: null,
  });

  return (
    <ActiveTrainContext.Provider value={{ activeState, setActiveState }}>
      {children}
    </ActiveTrainContext.Provider>
  );
}

export function useActiveTrainContext() {
  const context = useContext(ActiveTrainContext);
  if (context === undefined) {
    throw new Error(
      "useActiveTrainContext must be used within an ActiveTrainProvider"
    );
  }
  return context;
}

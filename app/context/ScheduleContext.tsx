"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Railcar } from "@/app/interfaces";

interface TrainSchedule {
  id: string;
  departureStationName: string;
  arrivalStationName: string;
  departureTime: string;
  arrivalTime: string;
  trainName: string;
  railcars: Railcar[];
}

interface ScheduleContextType {
  schedule: any;
  setSchedule: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined
);

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <ScheduleContext.Provider
      value={{ schedule, setSchedule, loading, setLoading, error, setError }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useScheduleContext = (): ScheduleContextType => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error(
      "useScheduleContext must be used within a ScheduleProvider"
    );
  }
  return context;
};

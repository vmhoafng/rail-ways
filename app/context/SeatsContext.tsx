"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface TrainInfo {
  trainId: string;
  departureStationName: string;
  arrivalStationName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  trainType: string;
  availableSeats: string[]; // Dữ liệu ghế còn trống chi tiết
  selectedSeats: string[]; // Danh sách ghế đã chọn
}

interface SeatsContextType {
  trains: TrainInfo[];
  updateTrain: (trainInfo: TrainInfo) => void;
  getTrainInfo: (trainId: string) => TrainInfo | undefined;
  updateSelectedSeats: (trainId: string, selectedSeats: string[]) => void;
  clearTrainInfo: (trainId: string) => void;
}

const SeatsContext = createContext<SeatsContextType | undefined>(undefined);

export const useSeatsContext = () => {
  const context = useContext(SeatsContext);
  if (!context) {
    throw new Error("useSeatsContext must be used within a SeatsProvider");
  }
  return context;
};

export const SeatsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [trains, setTrains] = useState<TrainInfo[]>([]);

  useEffect(() => {
    // Load train info from localStorage on initial render
    const storedTrains = localStorage.getItem("trainInfo");
    if (storedTrains) {
      try {
        setTrains(JSON.parse(storedTrains));
      } catch (error) {
        console.error("Failed to parse train info from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Save train info to localStorage whenever it changes
    try {
      localStorage.setItem("trainInfo", JSON.stringify(trains));
    } catch (error) {
      console.error("Failed to save train info to localStorage:", error);
    }
  }, [trains]);

  const updateTrain = (trainInfo: TrainInfo) => {
    setTrains((prevTrains) => {
      const existingTrainIndex = prevTrains.findIndex(
        (t) => t.trainId === trainInfo.trainId
      );
      if (existingTrainIndex >= 0) {
        // Update existing train info
        const newTrains = [...prevTrains];
        newTrains[existingTrainIndex] = trainInfo;
        return newTrains;
      } else {
        // Add new train info
        return [...prevTrains, trainInfo];
      }
    });
  };

  const getTrainInfo = (trainId: string): TrainInfo | undefined => {
    return trains.find((t) => t.trainId === trainId);
  };

  const updateSelectedSeats = (trainId: string, selectedSeats: string[]) => {
    setTrains((prevTrains) => {
      return prevTrains.map((train) => {
        if (train.trainId === trainId) {
          const updatedTrain = {
            ...train,
            selectedSeats,
          };
          return updatedTrain;
        }
        return train;
      });
    });
  };

  const clearTrainInfo = (trainId: string) => {
    setTrains((prevTrains) => prevTrains.filter((t) => t.trainId !== trainId));
  };

  return (
    <SeatsContext.Provider
      value={{
        trains,
        updateTrain,
        getTrainInfo,
        updateSelectedSeats,
        clearTrainInfo,
      }}
    >
      {children}
    </SeatsContext.Provider>
  );
};

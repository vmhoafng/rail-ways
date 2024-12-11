"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Định nghĩa kiểu dữ liệu TrainInfo
interface TrainInfo {
  trainId: string;
  departureStationName: string;
  arrivalStationName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  trainType: string;
  railcars: Railcar[]; // Thông tin các toa tàu
  selectedSeats: any[]; // Danh sách ghế đã chọn
}

// Định nghĩa kiểu dữ liệu Railcar (toa tàu)
interface Railcar {
  railcarName: string;
  railcarType: string; // Loại toa tàu
  totalSeat: number; // Tổng số ghế
  totalSeatAvailable: number; // Số ghế còn trống
  seats: Seat[]; // Danh sách ghế
}

// Định nghĩa kiểu dữ liệu Seat (ghế)
interface Seat {
  id: number;
  seatNumber: string;
  isAvailable: boolean; // Trạng thái ghế (trống hoặc đã đặt)
  price: number; // Giá vé
}

// Định nghĩa kiểu dữ liệu của context
interface SeatsContextType {
  trains: TrainInfo[];
  setTrains: (trains: TrainInfo[]) => void; // Đặt danh sách chuyến tàu
  updateTrain: (trainInfo: TrainInfo) => void; // Cập nhật thông tin chuyến tàu
  getTrainInfo: (trainId: string) => TrainInfo | undefined; // Lấy thông tin chuyến tàu
  updateSelectedSeats: (trainId: string, selectedSeats: string[]) => void; // Cập nhật ghế đã chọn
  clearTrainInfo: (trainId: string) => void; // Xóa thông tin chuyến tàu
}

const SeatsContext = createContext<SeatsContextType | undefined>(undefined);

// Custom hook để sử dụng SeatsContext
export const useSeatsContext = () => {
  const context = useContext(SeatsContext);
  if (!context) {
    throw new Error("useSeatsContext must be used within a SeatsProvider");
  }
  return context;
};

// Provider để bọc ứng dụng
export const SeatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trains, setTrains] = useState<TrainInfo[]>([]);

  // Load dữ liệu từ localStorage khi ứng dụng khởi chạy
  useEffect(() => {
    const storedTrains = localStorage.getItem("trainInfo");
    if (storedTrains) {
      try {
        setTrains(JSON.parse(storedTrains));
      } catch (error) {
        console.error("Failed to parse train info from localStorage:", error);
      }
    }
  }, []);

  // Lưu dữ liệu vào localStorage khi trains thay đổi
  useEffect(() => {
    try {
      localStorage.setItem("trainInfo", JSON.stringify(trains));
    } catch (error) {
      console.error("Failed to save train info to localStorage:", error);
    }
  }, [trains]);

  // Đặt toàn bộ danh sách chuyến tàu (ví dụ: từ API)
  const setTrainsHandler = (newTrains: TrainInfo[]) => {
    setTrains(newTrains);
  };

  // Cập nhật thông tin của một chuyến tàu
  const updateTrain = (trainInfo: TrainInfo) => {
    setTrains((prevTrains) => {
      const existingTrainIndex = prevTrains.findIndex((t) => t.trainId === trainInfo.trainId);
      if (existingTrainIndex >= 0) {
        const updatedTrains = [...prevTrains];
        updatedTrains[existingTrainIndex] = trainInfo;
        return updatedTrains;
      }
      return [...prevTrains, trainInfo];
    });
  };

  // Lấy thông tin chuyến tàu dựa trên trainId
  const getTrainInfo = (trainId: string): TrainInfo | undefined => {
    return trains.find((t) => t.trainId === trainId);
  };

  // Cập nhật danh sách ghế đã chọn của một chuyến tàu
  const updateSelectedSeats = (trainId: string, selectedSeats: string[]) => {
    setTrains((prevTrains) =>
      prevTrains.map((train) => {
        if (train.trainId === trainId) {
          return { ...train, selectedSeats };
        }
        return train;
      })
    );
  };

  // Xóa thông tin của một chuyến tàu
  const clearTrainInfo = (trainId: string) => {
    setTrains((prevTrains) => prevTrains.filter((t) => t.trainId !== trainId));
  };

  return (
    <SeatsContext.Provider
      value={{
        trains,
        setTrains: setTrainsHandler,
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

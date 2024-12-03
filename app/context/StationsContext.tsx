/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ENDPOINTS } from "@/constants/endpoint";
import { StationsService } from "@/services/api/stationsService";
import { createContext, useContext, useState, ReactNode } from "react";
import useSWR from "swr";
export interface StationsProps {
  id: string;
  name: string;
  address: boolean;
}
// Định nghĩa kiểu dữ liệu cho context
interface StationsContextType {
  stations: StationsProps[] | undefined;
  isLoading: boolean;
}

// Tạo context
const StationsContext = createContext<StationsContextType | null>(null);

// Provider để quản lý dữ liệu trong context
export const StationsProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: stations,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_RAILWAYS_API_URL}/${ENDPOINTS.STATION.LIST}`,
    StationsService.getStations
  );

  return (
    <StationsContext.Provider value={{ stations, isLoading }}>
      {children}
    </StationsContext.Provider>
  );
};

// Custom hook để lấy dữ liệu từ BookingContext
export const useStations = () => {
  const context = useContext(StationsContext);
  if (!context)
    throw new Error("useBooking phải được sử dụng trong StationProvider");
  return context;
};

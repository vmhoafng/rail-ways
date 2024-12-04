// src/services/api/scheduleService.ts
import { ENDPOINTS } from "@/constants/endpoint";
import axiosClient from "./axiosClient";

interface StationsParams {
  departureStation: string;
  arrivalStation: string;
  departureTime: string; // Có thể dùng `Date` nếu cần xử lý thời gian
}

export const StationsService = {
  getStations: async () => {
    try {
      const res = await axiosClient.get(ENDPOINTS.STATION.LIST);

      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

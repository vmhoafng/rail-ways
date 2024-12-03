// src/services/api/scheduleService.ts
import { ENDPOINTS } from "@/constants/endpoint";
import axiosClient from "./axiosClient";

interface ScheduleParams {
  departureStation: string;
  arrivalStation: string;
  departureTime: string; // Có thể dùng `Date` nếu cần xử lý thời gian
}

export const scheduleService = {
  getScheduleOneWay: (params: ScheduleParams) =>
    axiosClient.get(ENDPOINTS.SCHEDULE.GET_BY_INFO, { params }),
  getScheduleRoundTrip: (params: ScheduleParams) =>
    axiosClient.get(ENDPOINTS.SCHEDULE.GET_BY_INFO, { params }),
};

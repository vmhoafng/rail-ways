import { ENDPOINTS } from "@/constants/endpoint";
import { get, getPublic, post } from "@/lib/api";

export const getSchedule = async (payload: {
  departureStationId: string;
  arrivalStationId: string;
  departureTime: number | undefined;
}) => {
  return getPublic<any>(ENDPOINTS.SCHEDULE.GET_BY_INFO, { params: payload });
};

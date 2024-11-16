import { ENDPOINTS } from "@/constants/endpoint";
import { getPublic } from "@/lib/api";

export const getStation = () => {
  return getPublic<any>(ENDPOINTS.STATION.LIST);
};

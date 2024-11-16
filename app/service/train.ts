import { ENDPOINTS } from "@/constants/endpoint";
import { getPublic } from "@/lib/api";

export const getTrains = () => {
  return getPublic<any>(ENDPOINTS.TRAIN.LIST);
};

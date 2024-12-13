import http from "@/lib/http";
import { getAllResponse, GetScheduleResponse } from "../interfaces";

const searchApiRequest = {
  search: {
    getAllStations: () =>
      http.get<getAllResponse>("/api/v1/station/anonymous/get-all", {
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }),
    getScheduleByInfos: (params: {
      departureStation: string;
      arrivalStation: string;
      departureTime: any;
      arrivalTime?: any;
    }) => {
      const queryParams = new URLSearchParams(params).toString();
      return http.get<any>(
        `/api/v1/schedule/anonymous/get-by-departure-and-arrival-name?${queryParams}`
      );
    },
  },
  getScheduleById: (id: number, accessToken: string | null) =>
    http.get<GetScheduleResponse>(
      `/api/v1/schedule/anonymous/get-schedule/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ),
};

export default searchApiRequest;

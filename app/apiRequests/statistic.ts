import http from "@/lib/http";
import {} from "../interfaces";

const statisticApiRequest = {
  getRevenueInDay: (
    accessToken: string | null,
    params: { year: string; month: string; day: string }
  ) => {
    const queryParams = new URLSearchParams(params).toString();
    return http.get<any>(
      `/api/v1/statistic/get-revenue-in-date?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
  getRevenueInMonth: (
    accessToken: string | null,
    params: { year: string; month: string }
  ) => {
    const queryParams = new URLSearchParams(params).toString();
    return http.get<any>(
      `/api/v1/statistic/get-revenue-in-month?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
  getRevenueInYear: (accessToken: string | null, params: { year: string }) => {
    const queryParams = new URLSearchParams(params).toString();
    return http.get<any>(
      `/api/v1/statistic/get-revenue-in-year?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
};

export default statisticApiRequest;

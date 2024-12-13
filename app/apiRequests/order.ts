import http from "@/lib/http";
import { getAllResponse, GetScheduleResponse } from "../interfaces";

const searchApiRequest = {
  search: {
    Payment: (body: any) => http.post<any>("/api/v1/order/pay-order", body),
  },
};

export default searchApiRequest;

import http from "@/lib/http";
import { getAllResponse, GetScheduleResponse } from "../interfaces";
interface responseLinkPayment {
    message: string;
    result: {
      message: string;
    }   
}
const orderApiRequest = {
  payment: {
    login: (body: any, token: string) =>
      http.post<responseLinkPayment>("/api/v1/order/pay-order", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    anonymous: (body: any) =>
      http.post<responseLinkPayment>("/api/v1/order/anonymous/pay-order", body),
  },
};

export default orderApiRequest;

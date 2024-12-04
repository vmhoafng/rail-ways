import http from "@/lib/http";
import { getAllResponse } from "../interfaces";

const searchApiRequest = {
  search: {
    getAll: () => {
      http.get<getAllResponse>("/api/v1/auth/anonymous/get-all-user");
    },
  },
};
export default searchApiRequest;

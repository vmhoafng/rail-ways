import http from "@/lib/http";
import { getAllResponse } from "../interfaces";

const searchApiRequest = {
  search: {
    getAll: () =>
      http.get<getAllResponse>("/api/v1/station/anonymous/get-all", {
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }),
  },
};

export default searchApiRequest;

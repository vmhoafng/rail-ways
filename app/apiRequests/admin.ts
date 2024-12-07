import http from "@/lib/http";
import {
  createRailCarBodyType,
  createRailCarResponse,
  createRouteBodyType,
  createRouteResponse,
  createStationBodyType,
  createStationResponse,
  createTrainBodyType,
  createTrainResponse,
  deleteUserBodyType,
  GetAllRailCarResponse,
  getAllStationsResponse,
  getAllTicketsResponse,
  GetAllTrainBasicResponse,
  getAllUsersResponse,
  getUserByIdResponse,
  UpdateProfileResponse,
  updateUserBodyType,
} from "../interfaces";

const adminApiRequests = {
  train: {
    getAll: (accessToken: string | null) =>
      http.get<GetAllTrainBasicResponse>("/api/v1/train/get-all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    create: (body: createTrainBodyType, accessToken: string | undefined) =>
      http.post<createTrainResponse>("/api/v1/train/create", {
        body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
  },
  railCar: {
    getAll: (accessToken: string | undefined) =>
      http.get<GetAllRailCarResponse>("/api/v1/railcar/get-all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    create: (body: createRailCarBodyType, accessToken: string | undefined) =>
      http.post<createRailCarResponse>("/api/v1/railcar/create", {
        body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
  },

  station: {
    create: (body: createStationBodyType, accessToken: string | undefined) =>
      http.post<createStationResponse>("/api/v1/station/create", {
        body,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    getAll: () =>
      http.get<getAllStationsResponse>("/api/v1/station/anonymous/get-all"),
  },
  ticket: {
    getAll: (accessToken: string | undefined) => {
      return http.get<getAllTicketsResponse>("/api/v1/ticket/get-all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    getAllTicketBydepartureNameandArrivalName: (params: {
      departureStation: string;
      arrivalStation: string;
    }) => {
      const queryParams = new URLSearchParams(params).toString();
      return http.get(`/api/v1/ticket/get-by?${queryParams}`);
    },
  },
  user: {
    getAll: (accessToken: string | undefined) => {
      return http.get<getAllUsersResponse>(`/api/v1/auth/get-all-user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    getUserById: (accessToken: string | undefined, userId: string) => {
      return http.get<getUserByIdResponse>(`/api/v1/auth/get-by-id/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    update: (body: updateUserBodyType, accessToken: string | undefined) => {
      http.post<UpdateProfileResponse>(`/api/v1/auth/update-user`, {
        body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    delete: (body: deleteUserBodyType, accessToken: string | undefined) => {
      return http.post(`/api/v1/auth/hard-delete`, {
        body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
  },
  route: {
    create: (body: createRouteBodyType, accessToken: string | undefined) =>
      http.post<createRouteResponse>("/api/v1/route/create", {
        body,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
  },
};
export default adminApiRequests;

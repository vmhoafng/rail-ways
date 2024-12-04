// src/services/apiService.ts
import axios from "axios";

// Hàm xử lý các phương thức gọi API
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RAILWAYS_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Hàm gọi API cho từng phương thức cụ thể
export const apiService = {
  getTrains: () => apiClient.get("/trains"),
  getStation: () => apiClient.get("/station/anonymous/get-all"),
  addTrain: (data: any) => apiClient.post("/trains", data),
  updateTrain: (id: string, data: any) => apiClient.put(`/trains/${id}`, data),
  deleteTrain: (id: string) => apiClient.delete(`/trains/${id}`),
  // Tương tự, thêm các API khác (e.g., carriages, users, tickets)
};

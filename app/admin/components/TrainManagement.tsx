// src/components/admin/TrainManagement.tsx
import React, { useEffect, useState } from "react";
import TabContent from "./TabContent";
import { TrainBasicInfo } from "@/app/interfaces";
import adminApiRequests from "@/app/apiRequests/admin";

const TrainManagement = () => {
  const [trains, setTrains] = useState<TrainBasicInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTrains = async () => {
    const accessToken = localStorage.getItem("accessToken") || "";
    try {
      const response = await adminApiRequests.train.getAll(accessToken);
      console.log("API Response: ", response); // Xem toàn bộ phản hồi
      if (response.payload && response.payload.result) {
        setTrains(response.payload.result); // Chỉ gọi `setTrains` khi dữ liệu đúng
      } else {
        console.error("Invalid API Response: ", response.payload);
      }
    } catch (error) {
      console.error("Error fetching trains: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchTrains();
      setLoading(false);
    };
    fetchData(); // Gọi hàm bên trong `useEffect`
  }, []);
  console.log(
    trains.map((train) => ({
      trainName: train.trainName,
      trainNumber: train.trainNumber,
      trainType: train.trainType,
      trainStatus: train.trainStatus,
    }))
  );

  return (
    <TabContent
      title="Quản lý Tàu"
      fields={["Mã tàu", "Tên tàu", "Loại tàu", "Ga hiện tại"]}
      data={trains.map((train) => ({
        trainName: train.trainName,
        trainNumber: train.trainNumber,
        trainType: train.trainType,
        trainStatus: train.trainStatus,
      }))}
      loading={loading}
    />
  );
};

export default TrainManagement;

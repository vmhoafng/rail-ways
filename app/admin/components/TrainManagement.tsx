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
      console.log("API Response: ", response);
      if (response.payload && response.payload.result) {
        setTrains(response.payload.result);
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
    fetchData();
  }, []);

  const handleAddTrain = async (newTrain: any) => {
    const accessToken = localStorage.getItem("accessToken") || "";
    console.log(newTrain);

    try {
      await adminApiRequests.train.create(newTrain, accessToken);
      fetchTrains(); // Refresh Train list
    } catch (error) {
      console.error("Error adding/updating Train:", error);
    }
  };

  const displayFields = [
    "trainNumber",
    "trainName",
    "trainType",
    "trainStatus",
  ];
  const addFields = [
    { name: "trainName", label: "Tên tàu", type: "text" },
    { name: "trainNumber", label: "Số hiệu tàu", type: "text" },
    { name: "trainType", label: "Loại tàu", type: "text" },
    { name: "currentStationId", label: "Ga hiện tại", type: "text" },
  ];

  return (
    <TabContent
      title="Quản lý Tàu"
      displayFields={displayFields}
      addFields={addFields}
      data={trains.map((train) => ({
        trainName: train.trainName,
        trainNumber: train.trainNumber,
        trainType: train.trainType,
        trainStatus: train.trainStatus,
      }))}
      onAdd={handleAddTrain}
      loading={loading}
    />
  );
};

export default TrainManagement;

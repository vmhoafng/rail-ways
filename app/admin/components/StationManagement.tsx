// src/components/admin/StationManagement.tsx
import React, { useEffect, useState } from "react";
import TabContent from "./TabContent";
import adminApiRequests from "@/app/apiRequests/admin";
import { createStationBodyType, Station } from "@/app/interfaces";

const StationManagement = () => {
  const [stations, setStations] = useState<Station[]>();
  const [loading, setLoading] = useState(false);

  // Fetch all stations from API
  const fetchStations = async () => {
    setLoading(true);
    try {
      const response = await adminApiRequests.station.getAll();
      setStations(response.payload.result); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching stations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new station
  const handleAddStation = async (newStation: createStationBodyType) => {
    const accessToken = localStorage.getItem("accessToken") || "";
    try {
      await adminApiRequests.station.create(newStation, accessToken);
      fetchStations(); // Refresh the station list
    } catch (error) {
      console.error("Error adding station:", error);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return (
    // src/components/admin/StationManagement.tsx
    // src/components/admin/StationManagement.tsx
    <TabContent
      title="Quản lý Ga"
      fields={["name", "address"]}
      data={
        stations?.map((station) => ({
          name: station.name,
          address: {
            street: station.address.split(",")[0] || "N/A",
            city: station.address.split(",")[1] || "N/A",
            state: station.address.split(",")[2] || "N/A",
          },
        })) || []
      }
      onAdd={handleAddStation}
      loading={loading}
    />
  );
};

export default StationManagement;

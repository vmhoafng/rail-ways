// src/components/admin/TrainManagement.tsx
import React, { useEffect, useState } from "react";
import TabContent from "./TabContent";
import { TrainBasicInfo } from "@/app/interfaces";
import adminApiRequests from "@/app/apiRequests/admin";

const TrainManagement = () => {
    const [trains, setTrains] = useState<TrainBasicInfo[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTrains = async () => {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken") || "";
        try {
            const response = await adminApiRequests.train.getAll(accessToken);
            setTrains(response.payload.result);
        } catch (error) {
            console.error("Error fetching trains:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrains();
        console.log("Trains: ", trains);

    }, []);

    return (
        <TabContent
            title="Quản lý Tàu"
            fields={["Mã tàu", "Tên tàu", "Loại tàu", "Ga hiện tại"]}
            data={trains.map((train) => ({
                trainName: train.trainName,
                trainNumber: train.trainNumber,
                trainType: train.trainType,
                currentStationId: train.currentStationId,
            }))}
            loading={loading}
        />

    );
};

export default TrainManagement;

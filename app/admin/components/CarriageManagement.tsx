// src/components/admin/CarriageManagement.tsx
import React, { useEffect, useState } from "react";
import TabContent from "./TabContent";
import adminApiRequests from "@/app/apiRequests/admin";
const CarriageManagement = () => {
    const [carriages, setCarriages] = useState<Railcar[]>([]); // Sử dụng interface Railcar
    const [loading, setLoading] = useState(false);
    interface Railcar {
        name: string;
        railcarType: string;
        capacity: number;
        seatPerRow: number;
        isHaveFloor: boolean;
    }

    // Fetch all carriages from API
    const fetchCarriages = async () => {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken") || "";
        try {
            const response = await adminApiRequests.railCar.getAll(accessToken);
            setCarriages(response.payload.result); // Update state with fetched data
        } catch (error) {
            console.error("Error fetching carriages:", error);
        } finally {
            setLoading(false);
        }
    };

    // Add a new carriage
    const handleAddCarriage = async (newCarriage: Railcar) => {
        const accessToken = localStorage.getItem("accessToken") || "";
        try {
            await adminApiRequests.railCar.create(newCarriage, accessToken);
            fetchCarriages(); // Refresh the carriage list
        } catch (error) {
            console.error("Error adding carriage:", error);
        }
    };

    useEffect(() => {
        fetchCarriages();
    }, []);

    return (
        <TabContent
            title="Quản lý Toa"
            fields={["Tên Toa", "Loại Toa", "Số Ghế", "Ghế Trống"]}
            data={carriages.map((carriage) => ({
                name: carriage.name,
                railcarType: carriage.railcarType,
                capacity: carriage.capacity,
                seatPerRow: carriage.seatPerRow,
                isHaveFloor: carriage.isHaveFloor,
            }))}
            onAdd={handleAddCarriage}
            loading={loading}
        />
    );
};

export default CarriageManagement;

// src/components/admin/TicketManagement.tsx
import React, { useEffect, useState } from "react";
import TabContent from "./TabContent";
import adminApiRequests from "@/app/apiRequests/admin";
interface Ticket {
    departureStationName: string;
    arrivalStationName: string;
    departureTime: string;
    seatNumber: string[];
    price: number;
    trainName: string;
}[]
const TicketManagement = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch all tickets from API
    const fetchTickets = async () => {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken") || "";
        try {
            const response = await adminApiRequests.ticket.getAll(accessToken);
            setTickets(response.payload.result); // Update state with fetched data
        } catch (error) {
            console.error("Error fetching tickets:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    return (
        <TabContent
            title="Quản lý Vé"
            fields={["Ga đi", "Ga đến", "Giờ khởi hành", "Số ghế", "Giá", "Tên tàu"]}
            data={tickets}
            loading={loading}
        />
    );
};

export default TicketManagement;

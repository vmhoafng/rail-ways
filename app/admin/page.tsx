"use client"
// src/pages/admin/index.tsx
import React, { useState } from "react";
import TrainManagement from "./components/TrainManagement";
import CarriageManagement from "./components/CarriageManagement";
import StationManagement from "./components/StationManagement";
import TicketManagement from "./components/TicketManagement";
import UserManagement from "./components/UserManagement";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("trains");

  const renderTabContent = () => {
    switch (activeTab) {
      case "trains":
        return <TrainManagement />;
      case "carriages":
        return <CarriageManagement />;
      case "stations":
        return <StationManagement />;
      case "tickets":
        return <TicketManagement />;
      case "users":
        return <UserManagement />;
      default:
        return <div>Chọn một tab để quản lý</div>;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-around bg-gray-100 p-4 rounded-md">
        <button
          className={`px-4 py-2 ${activeTab === "trains" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("trains")}
        >
          Quản lý Tàu
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "carriages" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("carriages")}
        >
          Quản lý Toa
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "stations" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("stations")}
        >
          Quản lý Ga
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "tickets" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("tickets")}
        >
          Quản lý Vé
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("users")}
        >
          Quản lý Người Dùng
        </button>
      </nav>
      <main className="mt-6">{renderTabContent()}</main>
    </div>
  );
};

export default AdminDashboard;

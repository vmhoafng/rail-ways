"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Train,
  Users,
  MapPin,
  Ticket,
  Route,
  Box,
  Calendar,
} from "lucide-react";

import AddScheduleDialog from "./components/AddScheduleDialog";
import MobileNav from "./components/MobileNav";
import TabContent from "./components/TabContent";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export interface TabContentItem {
  title: string;
  icon: React.ReactNode;
  fields: string[];
  data: Record<string, string | number>[];
}
export interface TabContentProps {
  tab: keyof TabContentType;
}

export type TabContentType = Record<string, TabContentItem>;

export const tabContent: TabContentType = {
  trains: {
    title: "Quản lý Tàu",
    icon: <Train className="w-4 h-4" />,
    fields: ["mã tàu", "tên tàu", "loại tàu", "vị trí hiện tại"],
    data: [
      {
        id: "T001",
        matau: "T001",
        tentau: "SE1",
        loaitau: "Tàu Nhanh",
        vitrihientai: "Ga Hà Nội",
      },
      {
        id: "T002",
        matau: "T002",
        tentau: "SE2",
        loaitau: "Tàu Nhanh",
        vitrihientai: "Ga Hà Nội",
      },
      {
        id: "T003",
        matau: "T003",
        tentau: "TN1",
        loaitau: "Tàu Thường",
        vitrihientai: "Ga Hà Nội",
      },
    ],
  },
  carriages: {
    title: "Quản lý Toa",
    icon: <Box className="w-4 h-4" />,
    fields: ["mã toa", "loại toa", "số ghế"],
    data: [
      { id: "C001", matoa: "C001", loaitoa: "Giường Nằm", soghe: 30 },
      { id: "C002", matoa: "C002", loaitoa: "Ghế Ngồi Mềm", soghe: 64 },
      { id: "C003", matoa: "C003", loaitoa: "Ghế Ngồi Cứng", soghe: 80 },
    ],
  },
  stations: {
    title: "Quản lý Ga",
    icon: <MapPin className="w-4 h-4" />,
    fields: ["mã ga", "tên ga", "địa chỉ"],
    data: [
      {
        id: "ST001",
        maga: "ST001",
        tenga: "Ga Hà Nội",
        diachi: "120 Lê Duẩn, Hà Nội",
      },
      {
        id: "ST002",
        maga: "ST002",
        tenga: "Ga Sài Gòn",
        diachi: "1 Nguyễn Thông, Quận 3, TP.HCM",
      },
      {
        id: "ST003",
        maga: "ST003",
        tenga: "Ga Đà Nẵng",
        diachi: "202 Hải Phòng, Đà Nẵng",
      },
    ],
  },
  tickets: {
    title: "Quản lý Vé",
    icon: <Ticket className="w-4 h-4" />,
    fields: ["mã vé", "mã chuyến", "giá"],
    data: [
      { id: "TK001", mave: "TK001", machuyen: "TR001", gia: "500000" },
      { id: "TK002", mave: "TK002", machuyen: "TR002", gia: "450000" },
      { id: "TK003", mave: "TK003", machuyen: "TR003", gia: "600000" },
    ],
  },
  users: {
    title: "Quản lý Người Dùng",
    icon: <Users className="w-4 h-4" />,
    fields: ["id", "tên", "email"],
    data: [
      {
        id: "U001",
        ma: "U001",
        ten: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
      },
      {
        id: "U002",
        ma: "U002",
        ten: "Trần Thị B",
        email: "tranthib@example.com",
      },
      { id: "U003", ma: "U003", ten: "Lê Văn C", email: "levanc@example.com" },
    ],
  },
  routes: {
    title: "Quản lý Tuyến Đường",
    icon: <Route className="w-4 h-4" />,
    fields: ["mã tuyến", "ga đi", "ga đến"],
    data: [
      { id: "R001", matuyen: "R001", gadi: "Ga Hà Nội", gaden: "Ga Sài Gòn" },
      { id: "R002", matuyen: "R002", gadi: "Ga Sài Gòn", gaden: "Ga Đà Nẵng" },
      { id: "R003", matuyen: "R003", gadi: "Ga Đà Nẵng", gaden: "Ga Hà Nội" },
    ],
  },
};

export default function AdminDashboardWithSchedule() {
  const [activeTab, setActiveTab] =
    React.useState<keyof TabContentType>("trains");
  const { setAdministrator } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("accessToken");

    if (!token) {
      // Nếu không có token, điều hướng về trang login
      router.push("/auth");
      return;
    }

    try {
      // Decode token để lấy roles
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const roles = decodedToken["X-User-Roles"];

      if (!roles || !roles.includes("USER") || roles.length === 1) {
        // Nếu chỉ có role USER, điều hướng về trang chính
        router.push("/403page");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      router.push("/auth");
    }
  }, [router]);
  useEffect(() => {
    setAdministrator(true);
  }, []);

  return (
    <div className="container-custom mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Trang Quản Trị</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Thêm lịch trình
              </Button>
            </DialogTrigger>
            <AddScheduleDialog />
          </Dialog>
        </div>
        <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as keyof TabContentType)}
        className="space-y-4">
        <Card className="hidden md:block">
          <CardContent className="p-2">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
              {Object.entries(tabContent).map(([key, { title, icon }]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex items-center justify-center">
                  {icon}
                  <span className="ml-2 hidden lg:inline">{title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </CardContent>
        </Card>
        <div>
          {Object.keys(tabContent).map((tab) => (
            <TabsContent key={tab} value={tab}>
              <TabContent tab={tab as keyof TabContentType} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

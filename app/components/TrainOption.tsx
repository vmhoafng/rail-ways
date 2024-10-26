"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Clock, Train, ChevronRight } from "lucide-react";

interface TrainOptionProps {
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  trainType: string;
}

export default function TrainOptionCard({
  departureTime,
  arrivalTime,
  duration,
  price,
  trainType,
}: TrainOptionProps) {
  const [activeTab, setActiveTab] = useState("seat");

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-orange-200">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">{departureTime}</span>
            <Clock className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            {duration}
            <span className="text-xs ml-1">(Asian/Ho Chi Minh)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-xl font-bold">{arrivalTime}</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-700 mb-2">
          <span>Tokyo Station</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span>Shin-Osaka Station</span>
        </div>
        <div className="flex justify-between items-center text-sm mb-4">
          <div className="flex items-center">
            <Train className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-blue-600 font-medium">{trainType}</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
            <span className="text-gray-600 mr-1">Ghế</span>
            <span className="text-green-600 font-medium">Còn chỗ</span>
          </div>
        </div>
        <Tabs defaultValue="seat" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-md">
            {[
              { value: "seat", label: "Chọn ghế" },
              { value: "itinerary", label: "Lịch trình" },
              { value: "amenities", label: "Tiện ích" },
              { value: "policy", label: "Chính sách" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`text-sm py-1.5 ${
                  activeTab === tab.value
                    ? "bg-white shadow rounded-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="seat">Nội dung chọn ghế</TabsContent>
          <TabsContent value="itinerary">Nội dung lịch trình</TabsContent>
          <TabsContent value="amenities">Nội dung tiện ích</TabsContent>
          <TabsContent value="policy">Nội dung chính sách</TabsContent>
        </Tabs>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center">
        <span className="text-2xl font-bold text-orange-500">
          {price.toLocaleString()}¥
        </span>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md">
          Chọn chuyến
        </Button>
      </div>
    </div>
  );
}

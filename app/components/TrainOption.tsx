"use client";

import React, { useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Clock, Train, ChevronRight } from "lucide-react";
import Seats from "./Seats";
import { useActiveTrainContext } from "../context/ActiveTrainContext";
import { useSeatsContext } from "../context/SeatsContext";
import { useJourneyContext } from "../context/JourneyContext";
import { useRouter, useSearchParams } from "next/navigation";

interface TrainOptionProps {
  trainId: string;
  departureStationName: string;
  arrivalStationName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  trainType: string;
  availableSeats: string[];
  journeyType: "outbound" | "return";
  setActiveTab: (value: "outbound" | "return") => void;
}

export default function TrainOptionCard({
  trainId,
  departureStationName,
  arrivalStationName,
  departureTime,
  arrivalTime,
  duration,
  trainType,
  availableSeats,
  journeyType,
  setActiveTab,
}: TrainOptionProps) {
  const router = useRouter();
  const { activeState, setActiveState } = useActiveTrainContext();
  const { updateTrain, getTrainInfo } = useSeatsContext();
  const {
    setOutboundTrainId,
    setReturnTrainId,
    outboundTrainId,
    returnTrainId,
    handleChooseChange,
  } = useJourneyContext();

  const isActive = activeState.trainId === trainId;
  const isSelected =
    journeyType === "outbound"
      ? outboundTrainId === trainId
      : returnTrainId === trainId;

  const updateTrainInfo = useCallback(() => {
    const existingTrainInfo = getTrainInfo(trainId);
    if (
      !existingTrainInfo ||
      existingTrainInfo.departureTime !== departureTime ||
      existingTrainInfo.departureStationName !== departureStationName ||
      existingTrainInfo.arrivalStationName !== arrivalStationName ||
      existingTrainInfo.arrivalTime !== arrivalTime ||
      existingTrainInfo.duration !== duration ||
      existingTrainInfo.trainType !== trainType ||
      JSON.stringify(existingTrainInfo.availableSeats) !==
      JSON.stringify(availableSeats)
    ) {
      updateTrain({
        trainId,
        departureStationName,
        arrivalStationName,
        departureTime,
        arrivalTime,
        duration,
        trainType,
        availableSeats,
        selectedSeats: existingTrainInfo?.selectedSeats || [],
      });
    }
  }, [
    trainId,
    departureTime,
    arrivalTime,
    duration,
    trainType,
    availableSeats,
    updateTrain,
    getTrainInfo,
  ]);

  useEffect(() => {
    updateTrainInfo();
  }, [updateTrainInfo]);

  const handleTabClick = (tabValue: string) => {
    if (isActive && activeState.activeTab === tabValue) {
      setActiveState({ trainId: null, activeTab: null });
    } else {
      setActiveState({ trainId, activeTab: tabValue });
    }
  };
  const searchParams = useSearchParams();
  const trip = searchParams.get("trip")?.trim().toLowerCase() as
    | "one-way"
    | "round-trip";
  const handleSelectTrain = () => {
    if (trip === "one-way") router.push(`/Booking?outbound${trainId}&isHaveRoundTrip=${false}`);
    if (trip === "round-trip") {
      if (journeyType === "outbound") {
        handleChooseChange(trainId);
        setActiveTab("return");
      }
      if (journeyType === "return") {
        setReturnTrainId(trainId);
        setActiveTab("outbound");
      }
    }
  };

  useEffect(() => {
    if (outboundTrainId && returnTrainId) {
      router.push(
        `/booking?outbound=${outboundTrainId}&return=${returnTrainId}`
      );
    }
  }, [outboundTrainId, returnTrainId]);
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden border ${isSelected ? "border-orange-500" : "border-orange-200"
        }`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">{departureTime}</span>
            <Clock className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            {duration}
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-xl font-bold">{arrivalTime}</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-700 mb-2">
          <span>{departureStationName}</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span>{arrivalStationName}</span>
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
        <Tabs
          value={isActive ? activeState.activeTab || "" : ""}
          className="w-full">
          <TabsList className="flex justify-center w-ful  l items-center bg-gray-100 p-1 h-fit rounded-md">
            {[
              { value: "seat", label: "Chọn ghế" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() => handleTabClick(tab.value)}
                className={`text-sm py-1.5 w-1/4 ${isActive && activeState.activeTab === tab.value
                  ? "bg-white shadow rounded-md"
                  : "text-gray-600 hover:text-gray-800"
                  }`}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="seat">
            {isActive && activeState.activeTab === "seat" && (
              <Seats trainId={trainId} />
            )}
          </TabsContent>
          <TabsContent value="itinerary">
            {isActive && activeState.activeTab === "itinerary" && (
              <p>Nội dung lịch trình</p>
            )}
          </TabsContent>
          <TabsContent value="amenities">
            {isActive && activeState.activeTab === "amenities" && (
              <p>Nội dung tiện ích</p>
            )}
          </TabsContent>
          <TabsContent value="policy">
            {isActive && activeState.activeTab === "policy" && (
              <p>Nội dung chính sách</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center">
        <span className="text-2xl font-bold text-orange-500">
        </span>
        <Button
          type="button"
          onClick={() => {
            handleSelectTrain();
          }}
          className={`font-medium px-6 py-2 rounded-md ${isSelected
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}>
          {isSelected ? "Đã chọn" : "Chọn chuyến"}
        </Button>
      </div>
    </div>
  );
}

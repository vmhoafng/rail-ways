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
import { Railcar } from "@/app/interfaces";

interface TrainOptionProps {
  trainId: string;
  departureStationName: string;
  arrivalStationName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  trainType: string;
  railcars: Railcar[]; // Cập nhật thông tin railcars
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
  railcars,
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
      JSON.stringify(existingTrainInfo.railcars) !== JSON.stringify(railcars)
    ) {
      updateTrain({
        trainId,
        departureStationName,
        arrivalStationName,
        departureTime,
        arrivalTime,
        duration,
        trainType,
        railcars,
        selectedSeats: existingTrainInfo?.selectedSeats || [],
      });
    }
  }, [
    trainId,
    departureTime,
    arrivalTime,
    duration,
    trainType,
    railcars,
    updateTrain,
    getTrainInfo,
  ]);

  useEffect(() => {
    updateTrainInfo();
  }, [updateTrainInfo]);

  const handleTabClick = () => {
    if (isActive && activeState.activeTab === "seats") {
      setActiveState({ trainId: null, activeTab: null });
    } else {
      setActiveState({ trainId, activeTab: "seats" });
    }
  };

  const searchParams = useSearchParams();
  const trip = searchParams.get("trip")?.trim().toLowerCase() as
    | "one-way"
    | "round-trip";
  const handleSelectTrain = () => {
    if (trip === "one-way") {
      setOutboundTrainId(trainId);
      router.push(`/Booking?outbound=${trainId}&isHaveRoundTrip=false`);
    } else if (trip === "round-trip") {
      if (journeyType === "outbound") {
        setOutboundTrainId(trainId);
        setActiveTab("return");
      } else {
        setReturnTrainId(trainId);
        router.push(`/booking?outbound=${outboundTrainId}&return=${trainId}`);
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
      className={`bg-white rounded-lg shadow-md overflow-hidden border ${
        isSelected ? "border-orange-500" : "border-orange-200"
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
        <div></div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end items-center">
        <Tabs value={isActive ? "seat" : ""} className="w-full">
          <TabsList className="flex justify-between items-center bg-gray-100 p-1 w-full h-fit rounded-md">
            <TabsTrigger
              value="seat"
              onClick={handleTabClick}
              className={`text-sm px-6 py-2 r ${
                isActive
                  ? "bg-white shadow rounded-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}>
              Chọn ghế
            </TabsTrigger>
            <Button
              type="button"
              onClick={handleSelectTrain}
              className={`font-medium px-6 py-2 rounded-md ${
                isSelected
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}>
              {isSelected ? "Đã chọn" : "Chọn chuyến"}
            </Button>
          </TabsList>
          <TabsContent value="seat">
            {isActive && <Seats trainId={trainId} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

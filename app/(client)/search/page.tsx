"use client";

import TrainOption from "@/app/components/TrainOption";
import { ActiveTrainProvider } from "@/app/context/ActiveTrainContext";
import React from "react";
interface TrainJourney {
  trainId: string;
  departureStationName: string;
  arrivalStationName: string;
  departureTime: string;
  arrivalTime: string;
  trainName: string;
  seatNumbersAvailable: string[];
}
const trainJourneyData: TrainJourney = {
  trainId: "SE23333",
  departureStationName: "Ga Hà Nội",
  arrivalStationName: "Ga Hải Phòng",
  departureTime: "2024-10-30T10:00:00.000+00:00",
  arrivalTime: "2024-10-30T11:30:00.000+00:00",
  trainName: "SE23333",
  seatNumbersAvailable: [
    "SE1.1",
    "SE1.2",
    "SE1.3",
    "SE1.4",
    "SE1.5",
    "SE1.11",
    "SE1.12",
    "SE1.13",
    "SE1.14",
    "SE1.15",
    "SE1.16",
    "SE1.17",
    "SE1.18",
    "SE1.19",
    "SE1.20",
    "SE1.21",
    "SE1.22",
    "SE1.23",
    "SE1.24",
    "SE1.25",
    "SE1.26",
    "SE1.27",
    "SE1.28",
    "SE1.29",
    "SE1.30",
    "SE1.31",
    "SE1.32",
    "SE2.1",
    "SE2.2",
    "SE2.3",
    "SE2.4",
    "SE2.5",
    "SE2.6",
    "SE2.7",
    "SE2.8",
    "SE2.9",
    "SE2.10",
    "SE2.11",
    "SE2.12",
    "SE2.13",
    "SE2.14",
    "SE2.15",
    "SE2.16",
    "SE2.17",
    "SE2.27",
    "SE2.28",
    "SE2.29",
    "SE2.30",
    "SE2.31",
    "SE2.32",
  ],
};
const page = () => {
  return (
    <ActiveTrainProvider>
      <div className="space-y-4 mt-6">
        <TrainOption
          availableSeats={trainJourneyData.seatNumbersAvailable}
          trainId="1"
          departureTime="06:00"
          arrivalTime="08:16"
          duration="2 giờ 16 phút"
          price={97.4}
          trainType="Nozomi 99"
        />
        <TrainOption
          availableSeats={trainJourneyData.seatNumbersAvailable}
          trainId="2"
          departureTime="06:00"
          arrivalTime="08:22"
          duration="2 giờ 22 phút"
          price={97.4}
          trainType="Nozomi 1"
        />
      </div>
    </ActiveTrainProvider>
  );
};

export default page;

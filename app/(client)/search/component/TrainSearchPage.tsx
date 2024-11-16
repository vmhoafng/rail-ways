"use client";

import DatePicker from "@/app/components/DatePicker";
import { TimeFilter } from "@/app/components/TimeFilter";
import TrainOption from "@/app/components/TrainOption";
import JourneyTabs from "../../../components/JourneyTabs";
import { ActiveTrainProvider } from "@/app/context/ActiveTrainContext";
import React, { useState } from "react";
import { getTrains } from "@/app/service/train";

interface TrainJourney {
  id: string;
  departureStationName: string;
  arrivalStationName: string;
  departureTime: string;
  arrivalTime: string;
  trainName: string;
  seatNumbersAvailable: string[];
}

const trainJourneyData: TrainJourney = {
  id: "SE23333",
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

const TrainSearchPage = ({ trains }: { trains: TrainJourney[] }) => {
  console.log(trains);

  const timeRanges = ["00:00-08:59", "09:00-11:59", "12:00-16:59"];
  const [timePicked, setTimePicked] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"outbound" | "return">("outbound");
  console.log(getTrains());

  const filterTimeRanges = (time: string) => {
    setTimePicked((prevTimes) =>
      prevTimes.includes(time)
        ? prevTimes.filter((t) => t !== time)
        : [...prevTimes, time]
    );
  };

  return (
    <ActiveTrainProvider>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Tìm kiếm chuyến tàu
          </h1>
          <DatePicker />
          <TimeFilter
            timePicked={timePicked}
            filterTimeRanges={filterTimeRanges}
            timeRanges={timeRanges}
          />
        </div>
        <JourneyTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          outboundDate="THỨ 3, 05/11"
          returnDate="THỨ 6, 08/11"
        />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === "outbound" ? "Chuyến đi" : "Chuyến về"}
          </h2>
          {activeTab === "outbound" ? (
            trains.map((train: TrainJourney) => (
              <>
                <TrainOption
                  availableSeats={trainJourneyData.seatNumbersAvailable}
                  trainId={train.id}
                  departureTime="06:00"
                  arrivalTime="08:16"
                  duration="2 giờ 16 phút"
                  price={97.4}
                  trainType="Nozomi 99"
                />
              </>
            ))
          ) : (
            <p className="text-gray-600">Không có chuyến về được chọn.</p>
          )}
        </div>
      </div>
    </ActiveTrainProvider>
  );
};

export default TrainSearchPage;

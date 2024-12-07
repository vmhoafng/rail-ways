"use client";

import DatePicker from "@/app/components/DatePicker";
import { TimeFilter } from "@/app/components/TimeFilter";
import TrainOption from "@/app/components/TrainOption";
import JourneyTabs from "../../../components/JourneyTabs";
import { ActiveTrainProvider } from "@/app/context/ActiveTrainContext";
import React, { useEffect, useState } from "react";
import {
  JourneyProvider,
  useJourneyContext,
} from "@/app/context/JourneyContext";
import { useSearchParams } from "next/navigation";
import { vi } from "date-fns/locale";
import { format, differenceInMinutes } from "date-fns";
import searchApiRequest from "@/app/apiRequests/search";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Railcar } from "@/app/interfaces";
import { useScheduleContext } from "@/app/context/ScheduleContext";
import { scheduler } from "timers/promises";

interface TrainJourney {
  id: string;
  departureStationName: string;
  arrivalStationName: string;
  departureTime: string;
  arrivalTime: string;
  trainName: string;
  railcars: Railcar[]; // Thêm railcars
}

// const trainJourneyData: TrainJourney = {
//   id: TrainJourney.id,
//   departureStationName: "Ga Hà Nội",
//   arrivalStationName: "Ga Hải Phòng",
//   departureTime: "2024-10-30T10:00:00.000+00:00",
//   arrivalTime: "2024-10-30T11:30:00.000+00:00",
//   trainName: "SE23333",
//   seatNumbersAvailable: ["SE1.1", "SE1.2", "SE1.3", "SE1.4", "SE1.5"],
// };

const TrainSearchPage = () => {
  const [timePicked, setTimePicked] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"outbound" | "return">("outbound");
  const { returnTrainId, outboundTrainId } = useJourneyContext();
  const searchParams = useSearchParams();
  const { schedule, loading, error } = useScheduleContext();
  console.log(schedule);

  useEffect(() => {
    if (!outboundTrainId) setActiveTab("outbound");
    else if (!returnTrainId) setActiveTab("return");
  }, [outboundTrainId, returnTrainId]);

  const filterTimeRanges = (time: string) => {
    setTimePicked((prevTimes) =>
      prevTimes.includes(time)
        ? prevTimes.filter((t) => t !== time)
        : [...prevTimes, time]
    );
  };

  const outboundDate = new Date(+searchParams.get("departureTime")!);
  const returnDate = new Date(+searchParams.get("arrivalTime")!);
  const trip = searchParams.get("trip")?.trim().toLowerCase() as
    | "one-way"
    | "round-trip";
  const duration = (departureTime: string, arrivalTime: string) => {
    const start = new Date(departureTime);
    const end = new Date(arrivalTime);
    const totalMinutes = differenceInMinutes(end, start);

    const hours = Math.floor(totalMinutes / 60); // Số giờ
    const minutes = totalMinutes % 60; // Số phút
    return `${hours} giờ ${minutes} phút`;
  };
  return (
    <JourneyProvider>
      <ActiveTrainProvider>
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {trip === "round-trip" && (
            <JourneyTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              outboundDate={format(outboundDate, "EEEE, dd/MM", {
                locale: vi,
              }).toUpperCase()}
              returnDate={format(returnDate, "EEEE, dd/MM", {
                locale: vi,
              }).toUpperCase()}
            />
          )}
          <div className="space-y-4">
            {trip === "round-trip" && (
              <h2 className="text-xl font-semibold text-gray-800">
                {activeTab === "outbound" ? "Chuyến đi" : "Chuyến về"}
              </h2>
            )}
            {loading ? (
              // Loading skeleton
              <>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-[100px] w-full" />
                  </div>
                ))}
              </>
            ) : error ? (
              // Error message
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Lỗi</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : schedule.length > 0 && trip === "one-way" ? schedule?.map((train: TrainJourney) => (
              <TrainOption
                key={train.id}
                departureStationName={train.departureStationName}
                arrivalStationName={train.arrivalStationName}
                trainId={train.id}
                departureTime={format(
                  new Date(train.departureTime),
                  "HH:mm",
                  { locale: vi }
                )}
                arrivalTime={format(
                  new Date(train.arrivalTime),
                  "HH:mm",
                  { locale: vi }
                )}
                duration={duration(train.departureTime, train.arrivalTime)}
                trainType={train.trainName}
                railcars={train.railcars}
                journeyType={activeTab}
                setActiveTab={setActiveTab}
              />
            )) : activeTab === "outbound" ? (
              schedule[0]?.map((train: TrainJourney) => (
                <TrainOption
                  key={train.id}
                  departureStationName={train.departureStationName}
                  arrivalStationName={train.arrivalStationName}
                  trainId={train.id}
                  departureTime={format(
                    new Date(train.departureTime),
                    "HH:mm",
                    { locale: vi }
                  )}
                  arrivalTime={format(
                    new Date(train.arrivalTime),
                    "HH:mm",
                    { locale: vi }
                  )}
                  duration={duration(train.departureTime, train.arrivalTime)}
                  trainType={train.trainName}
                  railcars={train.railcars}
                  journeyType={activeTab}
                  setActiveTab={setActiveTab}
                />
              ))
            ) : (
              schedule[1]?.map((train: TrainJourney) => (
                <TrainOption
                  key={train.id}
                  departureStationName={train.departureStationName}
                  arrivalStationName={train.arrivalStationName}
                  trainId={train.id}
                  departureTime={format(
                    new Date(train.departureTime),
                    "HH:mm",
                    { locale: vi }
                  )}
                  arrivalTime={format(new Date(train.arrivalTime), "HH:mm", {
                    locale: vi,
                  })}
                  duration={duration(train.departureTime, train.arrivalTime)}
                  trainType={train.trainName}
                  railcars={train.railcars}
                  journeyType={activeTab}
                  setActiveTab={setActiveTab}
                />
              ))
            )}
          </div>
        </div>
      </ActiveTrainProvider>
    </JourneyProvider>
  );
};

export default TrainSearchPage;

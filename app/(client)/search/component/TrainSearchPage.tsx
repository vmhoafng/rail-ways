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
import { format } from "date-fns";
import searchApiRequest from "@/app/apiRequests/search";
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
  seatNumbersAvailable: ["SE1.1", "SE1.2", "SE1.3", "SE1.4", "SE1.5"],
};

const TrainSearchPage = ({ trains }: { trains: TrainJourney[] | null }) => {
  // const timeRanges = ["00:00-08:59", "09:00-11:59", "12:00-16:59"];
  const [timePicked, setTimePicked] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"outbound" | "return">("outbound");
  const { returnTrainId, outboundTrainId } = useJourneyContext();
  const [Journey, setJourney] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const departureStation = searchParams.get("departureStation")!;
  const arrivalStation = searchParams.get("arrivalStation")!;
  const arrivalTime = searchParams.get("arrivalTime")!;
  const departureTime = searchParams.get("departureTime")!;
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const journey: any = await searchApiRequest.search.getScheduleByInfos({ departureStation, arrivalStation });
        //y la get k lay body dc ne doi ti
        //tren swwageer co ma
        
        console.log(journey.payload);
        setJourney(journey.payload.result);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch train data");
        setLoading(false);
      }
    };
    fetchStations();
  }, []);
  // Effect to manage tab switching based on selected train IDs
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
  return (
    <JourneyProvider>
      <ActiveTrainProvider>
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {/* <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Tìm kiếm chuyến tàu
            </h1>
            {/* <DatePicker /> */}
          {/* <TimeFilter
              timePicked={timePicked}
              filterTimeRanges={filterTimeRanges}
              timeRanges={timeRanges}
            /> }
          </div> */}
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
            {trains && trains.length > 0 ? (
              trains.map((train: TrainJourney) => (
                <TrainOption
                  key={train.id}
                  availableSeats={trainJourneyData.seatNumbersAvailable}
                  trainId={train.id}
                  departureTime={train.departureTime}
                  arrivalTime={train.arrivalTime}
                  duration="2 giờ 16 phút"
                  price={97.4}
                  trainType="Nozomi 99"
                  journeyType={activeTab}
                  setActiveTab={setActiveTab}
                />
              ))
            ) : (
              <>
                <TrainOption
                  key={"train.id"}
                  availableSeats={trainJourneyData.seatNumbersAvailable}
                  trainId={"train.id"}
                  departureTime={""}
                  arrivalTime={""}
                  duration="2 giờ 16 phút"
                  price={97.4}
                  trainType="Nozomi 99"
                  journeyType={activeTab}
                  setActiveTab={setActiveTab}
                />
                <p className="text-gray-600">Không tìm được chuyến đi.</p>
              </>
            )}
          </div>
        </div>
      </ActiveTrainProvider>
    </JourneyProvider>
  );
};

export default TrainSearchPage;

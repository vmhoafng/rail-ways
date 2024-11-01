"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSeatsContext } from "../context/SeatsContext";

interface SeatProps {
  trainId: string;
  number: string;
  isAvailable: boolean;
  isSelected: boolean;
  onSelect: (seatNumber: string) => void;
}

const Seat: React.FC<SeatProps> = ({
  trainId,
  number,
  isAvailable,
  isSelected,
  onSelect,
}) => (
  <button
    className={cn(
      "size-10 m-0.5 sm:m-1 text-xs sm:text-sm font-semibold rounded-t-lg border-2",
      isAvailable &&
        !isSelected &&
        "bg-white text-blue-600 border-blue-600 hover:bg-blue-100",
      isSelected && "bg-blue-600 text-white border-blue-800",
      !isAvailable &&
        "bg-orange-500 text-white border-orange-700 cursor-not-allowed"
    )}
    onClick={() => isAvailable && onSelect(number)}
    disabled={!isAvailable}>
    {number.split(".")[1]}
  </button>
);

interface SeatsProps {
  trainId: string;
}

export default function Seats({ trainId }: SeatsProps) {
  const [selectedCar, setSelectedCar] = useState("SE1");
  const { getTrainInfo, updateSelectedSeats } = useSeatsContext();
  const [currentAvailableSeats, setCurrentAvailableSeats] = useState<string[]>(
    []
  );

  const trainInfo = getTrainInfo(trainId);

  useEffect(() => {
    if (trainInfo) {
      setCurrentAvailableSeats(
        trainInfo.availableSeats.filter((seat) => seat.startsWith(selectedCar))
      );
    }
  }, [selectedCar, trainInfo]);

  const handleSeatSelect = (seatNumber: string) => {
    if (trainInfo) {
      const newSelectedSeats = trainInfo.selectedSeats.includes(seatNumber)
        ? trainInfo.selectedSeats.filter((seat) => seat !== seatNumber)
        : [...trainInfo.selectedSeats, seatNumber];
      updateSelectedSeats(trainId, newSelectedSeats);
    }
  };

  const renderSeatRow = (start: number, end: number) => (
    <div className="flex flex-col">
      {[...Array(end - start + 1)].map((_, index) => {
        const seatNumber = `${selectedCar}.${start + index}`;
        return (
          <Seat
            key={seatNumber}
            trainId={trainId}
            number={seatNumber}
            isAvailable={currentAvailableSeats.includes(seatNumber)}
            isSelected={trainInfo?.selectedSeats.includes(seatNumber) || false}
            onSelect={handleSeatSelect}
          />
        );
      })}
    </div>
  );

  if (!trainInfo) {
    return <div>Train information not found.</div>;
  }

  return (
    <div className="max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto p-2 sm:p-4">
      <div className="w-full flex justify-center space-x-1 sm:space-x-2 mb-4 sm:mb-8 pb-2">
        <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
        <div className="overflow-x-scroll w-full flex gap-2">
          {["SE1", "SE2"].map((car) => (
            <button
              key={car}
              onClick={() => setSelectedCar(car)}
              className={cn(
                "min-w-12 h-8 p-3 sm:w-14 sm:h-9 md:w-16 md:h-10 flex items-center justify-center text-xs font-semibold rounded-sm",
                car === selectedCar
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              )}>
              {car}
            </button>
          ))}
        </div>
        <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
      </div>

      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
        Toa số {selectedCar}: Ngồi mềm điều hòa
      </h2>

      <div className="border-2 sm:border-4 border-gray-300 rounded-lg p-2 sm:p-4 bg-gray-100 overflow-x-scroll">
        <div className="lg:flex w-full justify-between items-center mb-2 sm:mb-4 hidden">
          <div className="w-8 h-6 sm:w-12 sm:h-8 md:w-16 md:h-10 bg-gray-400 rounded-r-full"></div>
          <div className="w-8 h-6 sm:w-12 sm:h-8 md:w-16 md:h-10 bg-gray-400 rounded-l-full"></div>
        </div>
        <div className="flex justify-between min-w-fit">
          <div className="flex w-1/2 justify-evenly">
            {renderSeatRow(1, 4)}
            {renderSeatRow(9, 12)}
            {renderSeatRow(17, 20)}
            {renderSeatRow(25, 28)}
          </div>
          <div
            className="w-4 sm:w-6 md:w-8 bg-gray-200 mx-1 sm:mx-2"
            aria-label="Lối đi"></div>
          <div className="flex w-1/2 justify-evenly">
            {renderSeatRow(5, 8)}
            {renderSeatRow(13, 16)}
            {renderSeatRow(21, 24)}
            {renderSeatRow(29, 32)}
          </div>
        </div>
        <div className="lg:flex justify-between items-center mt-2 sm:mt-4 hidden">
          <div className="w-8 h-6 sm:w-12 sm:h-8 md:w-16 md:h-10 bg-gray-400 rounded-r-full"></div>
          <div className="w-8 h-6 sm:w-12 sm:h-8 md:w-16 md:h-10 bg-gray-400 rounded-l-full"></div>
        </div>
      </div>

      <div className="mt-2 sm:mt-4">
        <h3 className="font-semibold">Ghế đã chọn:</h3>
        <p>
          {trainInfo.selectedSeats.length > 0
            ? trainInfo.selectedSeats.join(", ")
            : "Chưa chọn"}
        </p>
      </div>
    </div>
  );
}

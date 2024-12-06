"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Train } from "lucide-react";
import { useEffect, useState } from "react";
import { useSeatsContext } from "../context/SeatsContext";

interface SeatProps {
  trainId: string;
  number: string;
  isAvailable: boolean;
  isSelected: boolean;
  onSelect: (seatNumber: string) => void;
}

const Seat = ({ trainId, number, isAvailable, isSelected, onSelect }: SeatProps) => (
  <button
    className={cn(
      "relative w-8 h-6 m-0.5 text-xs font-medium rounded-t-lg transition-colors", // h-6: giảm chiều cao
      "before:absolute before:bottom-0 before:left-0 before:right-0 before:h-1 before:bg-current before:opacity-20",
      isAvailable && !isSelected && "bg-white text-blue-600 hover:bg-blue-50 border border-blue-200",
      isSelected && "bg-blue-600 text-white border border-blue-700",
      !isAvailable && "bg-orange-500 text-white cursor-not-allowed"
    )}
    onClick={() => isAvailable && onSelect(number)}
    disabled={!isAvailable}
  >
    {number.split(".")[1]}
  </button>
);

const TrainCar = ({ number, isSelected, onClick }: { number: string; isSelected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "group relative flex items-center gap-1 px-3 py-2 rounded-lg transition-colors",
      isSelected ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
    )}
  >
    <Train className="w-4 h-4" />
    <span className="font-medium">{number}</span>
  </button>
);

interface SeatsProps {
  trainId: string;
}

export default function Seats({ trainId }: SeatsProps) {
  const [selectedCar, setSelectedCar] = useState("SE1");
  const { getTrainInfo, updateSelectedSeats } = useSeatsContext();
  const [currentAvailableSeats, setCurrentAvailableSeats] = useState<string[]>([]);

  const trainInfo = getTrainInfo(trainId);

  useEffect(() => {
    if (trainInfo) {
      setCurrentAvailableSeats(trainInfo.availableSeats.filter((seat) => seat.startsWith(selectedCar)));
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
    <div className="grid grid-cols-8 gap-y-1 gap-x-2 justify-center"> {/* gap-y-1: giảm khoảng cách giữa hàng */}
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

  const cars = ["SE1", "SE2", "SE3", "SE4", "SE5", "SE6", "SE7", "SE8", "SE9", "SE10", "SE11", "SE12"];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Train car selector */}
      <div className="relative flex items-center">
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-2 px-2">
            {cars.map((car) => (
              <TrainCar key={car} number={car} isSelected={car === selectedCar} onClick={() => setSelectedCar(car)} />
            ))}
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Car title */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Toa số {selectedCar}</h2>
        <p className="text-sm text-gray-500">Ngồi mềm điều hòa - 64 ghế</p>
      </div>

      {/* Seating layout */}
      <div className="relative border rounded-xl bg-gray-50 p-6 transform scale-y-90"> {/* scale-y-90: thu nhỏ chiều dọc */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-16 bg-gray-200 rounded-r-full" />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-16 bg-gray-200 rounded-l-full" />

        {/* Seats grid */}
        <div className="flex flex-col max-w-5xl mx-auto">
          <div className="flex flex-col">
            {renderSeatRow(1, 16)}
            {renderSeatRow(17, 32)}
          </div>
          <div className="h-6 bg-gray-200 my-2 rounded" aria-label="Lối đi" />
          <div className="flex flex-col">
            {renderSeatRow(33, 48)}
            {renderSeatRow(49, 64)}
          </div>
        </div>
      </div>

      {/* Selected seats */}
      <div className="p-4 bg-white rounded-lg border">
        <h3 className="font-medium text-gray-900">Ghế đã chọn</h3>
        <p className="mt-1 text-gray-600">
          {trainInfo.selectedSeats.length > 0 ? trainInfo.selectedSeats.join(", ") : "Chưa chọn ghế nào"}
        </p>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white border border-blue-200" />
          <span>Còn trống</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-600" />
          <span>Đã chọn</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-orange-500" />
          <span>Đã đặt</span>
        </div>
      </div>
    </div>
  );
}

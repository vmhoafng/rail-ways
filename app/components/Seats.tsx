import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SeatStatus = "available" | "selected" | "unavailable";

interface SeatProps {
  number: number;
  status: SeatStatus;
  onSelect: (number: number) => void;
}

const Seat: React.FC<SeatProps> = ({ number, status, onSelect }) => (
  <button
    className={cn(
      "size-10 m-0.5 sm:m-1 text-xs sm:text-sm font-semibold rounded-t-lg border-2",
      status === "available" &&
      "bg-white text-blue-600 border-blue-600 hover:bg-blue-100",
      status === "selected" && "bg-blue-600 text-white border-blue-800",
      status === "unavailable" &&
      "bg-orange-500 text-white border-orange-700 cursor-not-allowed"
    )}
    onClick={() => status !== "unavailable" && onSelect(number)}
    disabled={status === "unavailable"}>
    {number}
  </button>
);

const TrainCar: React.FC<{
  number: number | string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ number, isSelected, onClick }) => (
  <button
    className={cn(
      "w-12 h-8 sm:w-14 sm:h-9 md:w-16 md:h-10 flex items-center justify-center text-xs font-semibold rounded-sm",
      isSelected
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
    )}
    onClick={onClick}>
    {number}
  </button>
);

export default function TrainCarSelection() {
  const [selectedCar, setSelectedCar] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const unavailableSeats = [
    1, 2, 3, 4, 25, 26, 27, 28, 29, 31, 33, 45, 46, 51, 53, 54, 55, 56,
  ];

  const handleSeatSelect = (seatNumber: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((num) => num !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const getSeatStatus = (seatNumber: number): SeatStatus => {
    if (unavailableSeats.includes(seatNumber)) return "unavailable";
    if (selectedSeats.includes(seatNumber)) return "selected";
    return "available";
  };

  const renderSeatRow = (start: number, end: number) => (
    <div className="flex flex-col">
      {[...Array(end - start + 1)].map((_, index) => (
        <Seat
          key={start + index}
          number={start + index}
          status={getSeatStatus(start + index)}
          onSelect={handleSeatSelect}
        />
      ))}
    </div>
  );

  return (
    <div className="max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto p-2 sm:p-4">
      <div className="flex justify-center space-x-1 sm:space-x-2 mb-4 sm:mb-8 overflow-x-auto pb-2">
        <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
        {[12, 11, 10, 9, 8, 7, 5, 4, 2, 1, "SE21"].map((car, index) => (
          <TrainCar
            key={index}
            number={car}
            isSelected={car === selectedCar}
            onClick={() => setSelectedCar(typeof car === "number" ? car : 21)}
          />
        ))}
        <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
      </div>

      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
        Toa số {selectedCar}: Ngồi mềm điều hòa
      </h2>

      <div className="border-2 sm:border-4 border-gray-300 rounded-lg p-2 sm:p-4 bg-gray-100">
        <div className="flex justify-between items-center mb-2 sm:mb-4">
          <div className="w-8 h-6 sm:w-12 sm:h-8 md:w-16 md:h-10 bg-gray-400 rounded-r-full"></div>
          <div className="w-8 h-6 sm:w-12 sm:h-8 md:w-16 md:h-10 bg-gray-400 rounded-l-full"></div>
        </div>
        <div className="flex justify-between">
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
        <div className="flex justify-between items-center mt-2 sm:mt-4">
          <div className="w-8 h-6 sm:w-12 sm:h-8 md:w-16 md:h-10 bg-gray-400 rounded-r-full"></div>
          <div className="w-8 h-6 sm:w-12 sm:h-8 md:w-16 md:h-10 bg-gray-400 rounded-l-full"></div>
        </div>
      </div>

      <div className="mt-2 sm:mt-4">
        <h3 className="font-semibold">Ghế đã chọn:</h3>
        <p>
          {selectedSeats.length > 0 ? selectedSeats.join(", ") : "Chưa chọn"}
        </p>
      </div>
    </div>
  );
}

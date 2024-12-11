"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Train } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSeatsContext } from "../context/SeatsContext";

interface SeatProps {
  seatNumber: any;
  isAvailable: boolean;
  isSelected: boolean;
  onSelect: (seatNumber: string) => void;
}

const Seat = ({ seatNumber, isAvailable, isSelected, onSelect }: SeatProps) => (
  <button
    className={cn(
      "relative w-10 h-10 text-xs font-medium rounded-lg transition-colors flex items-center justify-center",
      isAvailable &&
        !isSelected &&
        "bg-gray-200 hover:bg-gray-300 border border-gray-400",
      isSelected && "bg-blue-600 text-white border border-blue-700",
      !isAvailable && "bg-orange-500 text-white cursor-not-allowed"
    )}
    onClick={() => isAvailable && onSelect(seatNumber)}
    disabled={!isAvailable}
    aria-label={`Seat ${seatNumber}`}>
    {seatNumber.seatNumber.split(".")[1]}
  </button>
);

const TrainCar = ({
  number,
  isSelected,
  onClick,
}: {
  number: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "group relative flex items-center gap-1 px-3 py-2 rounded-lg transition-colors",
      isSelected
        ? "bg-blue-600 text-white"
        : "bg-white text-gray-600 hover:bg-gray-50"
    )}
    aria-pressed={isSelected}>
    <Train className="w-4 h-4" />
    <span className="font-medium">{number}</span>
  </button>
);

interface SeatsProps {
  trainId: string;
}

export default function Seats({ trainId }: SeatsProps) {
  const { getTrainInfo, updateSelectedSeats, trains } = useSeatsContext();
  const [selectedCar, setSelectedCar] = useState<string>("");

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trainInfo = trains.filter((train) => trainId === train.trainId)[0];

  useEffect(() => {
    if (trainInfo && selectedCar === "") {
      setSelectedCar(trainInfo.railcars[0].railcarName); // Chỉ chọn toa đầu tiên khi chưa chọn
    }
  }, [trainInfo, selectedCar]);

  const handleSeatSelect = (seatNumber: string) => {
    if (trainInfo) {
      const newSelectedSeats = trainInfo.selectedSeats.includes(seatNumber)
        ? trainInfo.selectedSeats.filter((seat) => seat !== seatNumber)
        : [...trainInfo.selectedSeats, seatNumber];
      updateSelectedSeats(trainInfo.trainId, newSelectedSeats);
    }
  };

  const renderSeats = () => {
    if (!trainInfo) return null;
    const selectedRailcar = trainInfo.railcars.find(
      (car) => car.railcarName === selectedCar
    );
    if (!selectedRailcar) return null;

    const seats = selectedRailcar.seats;
    const totalSeats = seats.length;
    const halfSeats = Math.ceil(totalSeats / 2);

    // Chia đều ghế thành 4 hàng
    const rows = Math.ceil(totalSeats / 4);
    const topLeft = seats.slice(0, rows);
    const topRight = seats.slice(rows, rows * 2);
    const bottomLeft = seats.slice(rows * 2, rows * 3);
    const bottomRight = seats.slice(rows * 3);

    return (
      <div className="space-y-4">
        {/* Ghế phần trên */}
        <div className="grid grid-row-2 gap-4 ">
          <div className="flex gap-2 justify-center">
            {topLeft.map((seat) => (
              <Seat
                key={seat.seatNumber}
                seatNumber={seat}
                isAvailable={seat.isAvailable}
                isSelected={trainInfo.selectedSeats.includes(seat)}
                onSelect={handleSeatSelect}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {topRight.map((seat) => (
              <Seat
                key={seat.seatNumber}
                seatNumber={seat}
                isAvailable={seat.isAvailable}
                isSelected={trainInfo.selectedSeats.includes(seat)}
                onSelect={handleSeatSelect}
              />
            ))}
          </div>
        </div>

        {/* Lối đi */}
        <div
          className="h-6 bg-gray-300 mx-auto w-full rounded-md"
          aria-label="Lối đi"></div>

        {/* Ghế phần dưới */}
        <div className="grid grid-row-2 gap-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {bottomLeft.map((seat) => (
              <Seat
                key={seat.seatNumber}
                seatNumber={seat}
                isAvailable={seat.isAvailable}
                isSelected={trainInfo.selectedSeats.includes(seat)}
                onSelect={handleSeatSelect}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {bottomRight.map((seat) => (
              <Seat
                key={seat.seatNumber}
                seatNumber={seat}
                isAvailable={seat.isAvailable}
                isSelected={trainInfo.selectedSeats.includes(seat)}
                onSelect={handleSeatSelect}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!trainInfo) {
    return (
      <div className="text-center text-gray-500">
        Không tìm thấy thông tin chuyến tàu.
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="relative flex items-center">
        <button
          onClick={() => handleScroll("left")}
          className="p-2 text-gray-400 hover:text-gray-600"
          aria-label="Scroll left">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 px-2">
            {trainInfo.railcars.map((car) => (
              <TrainCar
                key={car.railcarName}
                number={car.railcarName}
                isSelected={car.railcarName === selectedCar}
                onClick={() => setSelectedCar(car.railcarName)}
              />
            ))}
          </div>
        </div>
        <button
          onClick={() => handleScroll("right")}
          className="p-2 text-gray-400 hover:text-gray-600"
          aria-label="Scroll right">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Toa {selectedCar}
        </h2>
        <p className="text-sm text-gray-500">
          {
            trainInfo.railcars.find((car) => car.railcarName === selectedCar)
              ?.railcarType
          }{" "}
          -{" "}
          {
            trainInfo.railcars.find((car) => car.railcarName === selectedCar)
              ?.totalSeat
          }{" "}
          ghế
        </p>
      </div>

      <div className="relative border rounded-xl bg-gray-50 p-6">
        {renderSeats()}
      </div>

      <div className="p-4 bg-white rounded-lg border">
        <h3 className="font-medium text-gray-900">Ghế đã chọn</h3>
        <p className="mt-1 text-gray-600">
          {trainInfo.selectedSeats.length > 0
            ? trainInfo.selectedSeats.map((seat) => seat.seatNumber).join(", ")
            : "Chưa chọn ghế nào"}
        </p>
      </div>
    </div>
  );
}

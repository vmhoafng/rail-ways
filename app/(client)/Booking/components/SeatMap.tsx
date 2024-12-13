import React from "react";
import TrainCarSelection from "@/app/components/Seats";

interface SeatMapProps {
  onSeatSelect: (seatNumber: number) => void;
  trainId: any;
}

const SeatMap: React.FC<SeatMapProps> = ({ onSeatSelect, trainId }) => {
  return <TrainCarSelection trainId={trainId} />;
};

export default SeatMap;

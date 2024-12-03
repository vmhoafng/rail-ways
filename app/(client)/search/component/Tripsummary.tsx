import { Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJourneyContext } from "@/app/context/JourneyContext";

interface JourneyDetailsProps {
  date: string;
  departureTime: string;
  departureLocation: string;
  duration: string;
  arrivalTime: string;
  arrivalLocation: string;
  isFrom: boolean;
  stepNumber?: number;
}

export default function Component({
  date = "Thứ 5, 28/11/2024",
  departureTime = "05:30",
  departureLocation = "Bến Xe Miền Tây",
  duration = "3 giờ",
  arrivalTime = "08:30",
  arrivalLocation = "VP Bến Xe Vũng Tàu",
  stepNumber = 1,
  isFrom = true,
}: JourneyDetailsProps) {

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-base font-medium">
          {isFrom ? "CHUYẾN ĐI CỦA BẠN" : "CHUYẾN VỀ CỦA BẠN"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 font-medium">
            {stepNumber}
          </div>
          <div className="space-y-1">
            <div className="font-medium">{date}</div>
          </div>
        </div>

        <div className="relative pl-4 space-y-6">
          <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-200" />

          <div className="flex items-center gap-6 ml-3">
            <Circle className="w-5 h-5 absolute left-0 bg-green-500 text-white rounded-full p-1" />
            <div className="font-medium">{departureTime}</div>
            <div className="text-gray-600">{departureLocation}</div>
          </div>

          <div className="text-gray-500 text-sm pl-3">{duration}</div>

          <div className="flex items-center gap-6 ml-3">
            <Circle className="w-5 h-5 absolute left-0 bg-orange-500 text-white rounded-full p-1" />
            <div className="font-medium">{arrivalTime}</div>
            <div className="text-gray-600">{arrivalLocation}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

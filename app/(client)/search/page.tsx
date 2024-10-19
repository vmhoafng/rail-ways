import { DatePicker } from "../../components/DatePicker";
import { TimeFilter } from "../../components/TimeFilter";
import { TrainOption } from "../../components/TrainOption";

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Tokyo → Osaka</h2>
        <button className="text-blue-600">Thay đổi</button>
      </div>
      <DatePicker />
      <TimeFilter />
      <div className="space-y-4 mt-6">
        <TrainOption
          departureTime="06:00"
          arrivalTime="08:16"
          duration="2 giờ 16 phút"
          price={97.4}
          trainType="Nozomi 99"
        />
        <TrainOption
          departureTime="06:00"
          arrivalTime="08:22"
          duration="2 giờ 22 phút"
          price={97.4}
          trainType="Nozomi 1"
        />
      </div>
    </div>
  );
}

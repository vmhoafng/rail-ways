"use client";
import SearchForm from "@/app/components/SearchForm";
import DatePicker from "../../components/DatePicker";
import { TimeFilter } from "../../components/TimeFilter";
import TrainOption from "../../components/TrainOption";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FAQAccordion from "@/app/components/FAQAccordion";
import { useState } from "react";

export default function SearchPage() {
  const timeRanges = ["00:00-08:59", "09:00-11:59", "12:00-16:59"];
  const [timePicked, setTimePicked] = useState<string[]>([]);
  const filterTimeRanges = (time: string) => {
    if (timePicked.includes(time)) {
      setTimePicked(timePicked.filter((t) => t !== time));
    } else {
      setTimePicked([...timePicked, time]);
    }
  };
  return (
    <div className="container-custom mx-auto px-4 py-8">
      <SearchForm />
      <div className="mt-5 flex gap-3">
        <Link href={"/"}>Trang chủ</Link>
        <ChevronRight />
        <span className="text-gray-400">Kết quả tìm kiếm</span>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="w-1/4">
          <FAQAccordion className="px-5" />
        </div>
        <div className="w-3/4">
          <DatePicker />
          <TimeFilter
            timePicked={timePicked}
            filterTimeRanges={filterTimeRanges}
            timeRanges={timeRanges}
          />
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
      </div>
    </div>
  );
}

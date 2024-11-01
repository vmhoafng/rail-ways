// app/search/layout.tsx
"use client";
import SearchForm from "@/app/components/SearchForm";
import DatePicker from "../../components/DatePicker";
import { TimeFilter } from "../../components/TimeFilter";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FAQAccordion from "@/app/components/FAQAccordion";
import { useState } from "react";
import { apiService } from "@/lib/apiService";

const SearchLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const timeRanges = ["00:00-08:59", "09:00-11:59", "12:00-16:59"];
  const [timePicked, setTimePicked] = useState<string[]>([]);

  const filterTimeRanges = (time: string) => {
    setTimePicked((prevTimes) =>
      prevTimes.includes(time)
        ? prevTimes.filter((t) => t !== time)
        : [...prevTimes, time]
    );
  };

  return (
    <div className="container-custom mx-auto px-4 py-8">
      <SearchForm />
      <div className="mt-5 flex gap-3">
        <Link href={"/"}>Trang chủ</Link>
        <ChevronRight />
        <span className="text-gray-400">Kết quả tìm kiếm</span>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-4 mt-4">
        <div className="lg:w-1/4">
          <FAQAccordion className="px-5" />
        </div>
        <div className="lg:w-3/4">
          <DatePicker />
          <TimeFilter
            timePicked={timePicked}
            filterTimeRanges={filterTimeRanges}
            timeRanges={timeRanges}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default SearchLayout;

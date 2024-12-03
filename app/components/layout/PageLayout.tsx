// app/search/layout.tsx
"use client";
import SearchForm from "@/app/components/SearchForm";
import DatePicker from "../../components/DatePicker";
import { TimeFilter } from "../../components/TimeFilter";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FAQAccordion from "@/app/components/FAQAccordion";
import Tripsummary from "@/app/(client)/search/component/Tripsummary";
import {
  JourneyProvider,
  useJourneyContext,
} from "@/app/context/JourneyContext";
import { useEffect, useState } from "react";

const PageLayout: React.FC<
  React.PropsWithChildren<{
    header: string;
    withSearchForm?: boolean;
  }>
> = ({ children, header, withSearchForm }) => {
  const { outboundTrainId } = useJourneyContext();
  useEffect(() => {
    console.log(outboundTrainId);
  }, [outboundTrainId]);

  return (
    <div className="container-custom mx-auto px-4 my-8">
      {withSearchForm && <SearchForm />}
      <div className="mt-5 flex gap-3">
        <Link href={"/"}>Trang chủ</Link>
        <ChevronRight />
        <span className="text-gray-400">{header}</span>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-4 mt-4">
        <div className="lg:w-1/4">
          {outboundTrainId && (
            <Tripsummary
              date="Thứ 5, 28/11/2024"
              departureTime="05:30"
              departureLocation="Bến Xe Miền Tây"
              duration="3 giờ"
              arrivalTime="08:30"
              arrivalLocation="VP Bến Xe Vũng Tàu"
              stepNumber={1}
              isFrom={true}
            />
          )}
          <FAQAccordion className="px-5" />
        </div>
        <div className="lg:w-3/4">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;

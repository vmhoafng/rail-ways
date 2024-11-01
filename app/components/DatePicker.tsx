"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";

const weekDays: { [key: string]: string } = {
  Mon: "Thứ 2",
  Tue: "Thứ 3",
  Wed: "Thứ 4",
  Thu: "Thứ 5",
  Fri: "Thứ 6",
  Sat: "Thứ 7",
  Sun: "Chủ Nhật",
};

export default function DatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dates = Array.from({ length: 9 }, (_, i) => addDays(startDate, i));

  const handlePrevious = () => setStartDate(addDays(startDate, -9));
  const handleNext = () => setStartDate(addDays(startDate, 9));

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center justify-between p-2">
        <Button variant="ghost" size="icon" onClick={handlePrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex space-x-2 overflow-x-auto">
          {dates.map((date, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`flex flex-col items-center justify-center gap-1 p-2 size-16 rounded-lg transition-colors ${
                isSameDay(date, selectedDate)
                  ? "bg-orange-100 text-orange-600"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedDate(date)}>
              <span className="font-bold">
                {format(date, "d/M", { locale: vi })}
              </span>
              <span className="text-xs text-gray-500">
                {weekDays[format(date, "E")]}
              </span>
            </Button>
          ))}
        </div>
        <Button variant="ghost" size="icon" onClick={handleNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

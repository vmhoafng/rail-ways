"use client";

import { useState } from "react";

interface TimeFilter {
  timeRanges: string[];
  timePicked: string[];
  filterTimeRanges: (range: string) => void;
}

export function TimeFilter({
  timeRanges,
  filterTimeRanges,
  timePicked,
}: TimeFilter) {
  return (
    <div className="flex space-x-2 overflow-x-auto py-4">
      {timeRanges.map((range) => (
        <button
          onClick={() => {
            filterTimeRanges(range);
          }}
          key={range}
          className={`flex-shrink-0 px-4 py-2 rounded-full border border-gray-300 text-sm ${
            timePicked.includes(range) && "bg-orange-600 text-white"
          }`}>
          {range}
        </button>
      ))}
    </div>
  );
}

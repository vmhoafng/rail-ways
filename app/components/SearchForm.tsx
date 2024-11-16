"use client";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { format, isBefore, startOfToday } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowRightLeft } from "lucide-react";
import React, { useRef, useState } from "react";
import useDropdownMenu from "../hooks/useDropDown";
import { getSchedule } from "../service/schedule";
interface StationsProps {
  id: string;
  name: string;
  address: boolean;
}
export default function SearchForm({
  stations,
}: {
  stations: StationsProps[];
}) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { openMenus, toggleMenu, closeAllMenus } = useDropdownMenu();
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(Date.now())
  );
  const [returnDate, setReturnDate] = React.useState<Date | undefined>(
    new Date(Date.now())
  );
  const ValiDate = (day: Date) =>
    isBefore(day, startOfToday()) || (date ? isBefore(day, date) : false);
  const refFrom = useRef<HTMLInputElement>(null);
  const refTo = useRef<HTMLInputElement>(null);
  const [trip, setTrip] = useState<"one-way" | "round-trip">("one-way");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (trip === "one-way") {
      const formData = {
        departureStationId: from,
        arrivalStationId: to,
        departureTime: date && date.getTime(),
      };
      console.log(await getSchedule(formData));
    }
    if (trip === "round-trip") {
      const formData = {
        departureStationId: from,
        arrivalStationId: to,
        departureTime: date && date.getTime(),
      };
      console.log(getSchedule(formData));
    }
    // Tạo object chứa dữ liệu form

    // Gửi dữ liệu hoặc thực hiện hành động tiếp theo
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white shadow-lg rounded-lg">
      <div className="p-5 rounded-b-md">
        <RadioGroup
          onValueChange={(value) => setTrip(value as "one-way" | "round-trip")}
          defaultValue={trip}
          className="flex flex-wrap space-x-4 mt-4 mb-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-way" id="one-way" className="hidden" />
            <Label htmlFor="one-way" className="flex gap-2 items-center">
              <span
                className={` border-2 rounded-full -mt-0.5 ${
                  trip === "one-way" ? "border-orange-600" : "border-gray-200"
                }`}>
                <span
                  className={`flex items-center border cursor-pointer size-3 rounded-full ${
                    trip === "one-way" ? "bg-orange-600" : "bg-white"
                  }`}></span>
              </span>
              Một chiều
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="round-trip"
              id="round-trip"
              className="hidden"
            />
            <Label htmlFor="round-trip" className="flex gap-2 items-center">
              <span
                className={` border-2 rounded-full -mt-0.5 ${
                  trip === "round-trip"
                    ? "border-orange-600"
                    : "border-gray-200"
                }`}>
                <span
                  className={`flex items-center border  cursor-pointer size-3 rounded-full ${
                    trip === "round-trip" ? "bg-orange-600" : "bg-white"
                  }`}></span>
              </span>
              Khứ hồi
            </Label>
          </div>
        </RadioGroup>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="relative w-full lg:w-[520px]">
            <div className="w-full lg:w-[520px] bg-white rounded-lg ">
              <div className="bg-slate-100 flex lg:flex-row flex-col items-start justify-between lg:items-center rounded-lg h-full relative">
                <div className="flex-1 relative w-full lg:border-0 border-b-2 border-slate-300">
                  <label
                    htmlFor="from"
                    className="block font-medium text-gray-700 absolute text-sm ml-3 mt-2 ">
                    Từ
                  </label>
                  <Input
                    ref={refFrom}
                    onBlur={() => {
                      closeAllMenus();
                    }}
                    onFocus={() => {
                      toggleMenu("from");
                      if (openMenus["to"]) {
                        toggleMenu("to");
                      }
                    }}
                    id="from"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="block w-full ring-0 border-0 focus:focus-visible:ring-orange-600 shadow-none h-14 pt-5 font-semibold focus:bg-white"
                  />
                  {openMenus["from"] && (
                    <div className="p-4 mt-2 bg-white w-full absolute rounded-lg shadow-md max-h-96 overflow-y-scroll z-20">
                      <h3 className="font-semibold text-lg mt-4 mb-2">
                        Ga khởi hành
                      </h3>
                      <ul className="space-y-3">
                        {stations
                          .filter((station) => station.name !== to)
                          .map((station, index) => (
                            <li
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setFrom(station.name);
                                refFrom.current?.blur();
                                closeAllMenus();
                              }}
                              key={index}
                              className="flex items-center justify-between text-gray-600 hover:text-gray-900 cursor-pointer">
                              {station.name}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  className=" bg-white absolute size-8 top-1/2 -mt-4 left-1/2 -ml-5 z-10 rounded-full text-orange-600 hover:bg-white hover:text-orange-600 shadow-md"
                  onClick={() => {
                    const temp = from;
                    setFrom(to);
                    setTo(temp);
                  }}>
                  <ArrowRightLeft className="size-4" />
                </Button>
                <div className="flex-1 relative w-full">
                  <label
                    htmlFor="to"
                    className="block font-medium text-gray-700 absolute text-sm ml-3 mt-2 lg:pl-4">
                    Đến
                  </label>
                  <Input
                    ref={refTo}
                    onBlur={() => {
                      closeAllMenus();
                    }}
                    onFocus={() => {
                      toggleMenu("to");
                      if (openMenus["from"]) {
                        toggleMenu("from");
                      }
                    }}
                    id="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="lg:pl-7 block w-full ring-0 border-0 focus:focus-visible:ring-orange-600 shadow-none h-14 pt-5 font-semibold focus:bg-white"
                  />
                  {openMenus["to"] && (
                    <div className="p-4 mt-2 bg-white w-full absolute rounded-lg shadow-md max-h-96 overflow-y-scroll z-20">
                      <h3 className="font-semibold text-lg mt-4 mb-2">
                        Ga đến
                      </h3>
                      <ul className="space-y-3">
                        {stations
                          .filter((station) => station.name !== from)
                          .map((station, index) => (
                            <li
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setTo(station.name);
                                refTo.current?.blur();
                                closeAllMenus();
                              }}
                              key={index}
                              className="flex items-center justify-between text-gray-600 hover:text-gray-900 cursor-pointer">
                              {station.name}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full bg-slate-100 rounded-lg">
            {trip === "one-way" && (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative w-full">
                    <Label
                      htmlFor="date"
                      className="block font-medium text-gray-700 absolute text-sm ml-4 mt-2 z-10">
                      Ngày đi
                    </Label>
                    <Button
                      variant={"ghost"}
                      className={cn(
                        "w-full h-14 pt-6 text-left bg-slate-100 flex justify-start rounded-lg relative hover:bg-slate-100 font-semibold",
                        !date && "text-muted-foreground"
                      )}>
                      {date ? (
                        format(date, "dd/MM/yyyy")
                      ) : (
                        <span className="text-black mt-1">Pick a date</span>
                      )}
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    disabled={(day) => isBefore(day, startOfToday())}
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="w-full"
                  />
                </PopoverContent>
              </Popover>
            )}
            {trip === "round-trip" && (
              <div className="flex relative">
                <span className="absolute border border-slate-300 h-8 top-1/4 -mt-1 left-1/2 z-10"></span>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative w-full">
                      <Label
                        htmlFor="date"
                        className="block font-medium text-gray-700 absolute text-sm ml-4 mt-2 z-10">
                        Ngày khởi hành
                      </Label>
                      <Button
                        variant={"ghost"}
                        className={cn(
                          "w-full h-14 pt-6 text-left bg-slate-100 flex justify-start rounded-lg relative hover:bg-slate-100 font-semibold",
                          !date && "text-muted-foreground"
                        )}>
                        {date ? (
                          format(date, "dd/MM/yyyy")
                        ) : (
                          <span className="text-black mt-1">Pick a date</span>
                        )}
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      disabled={(day) => isBefore(day, startOfToday())}
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate); // Set the selected date
                        setReturnDate(undefined); // Set the return date if needed
                      }}
                      initialFocus
                      className="w-full"
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative w-full">
                      <Label
                        htmlFor="date"
                        className="block font-medium text-gray-700 absolute text-sm ml-4 mt-2 z-10">
                        Ngày trở về
                      </Label>
                      <Button
                        variant={"ghost"}
                        className={cn(
                          "w-full h-14 pt-6 text-left bg-slate-100 flex justify-start rounded-lg relative hover:bg-slate-100 font-semibold",
                          !returnDate && "text-muted-foreground"
                        )}>
                        {returnDate ? (
                          format(returnDate, "dd/MM/yyyy")
                        ) : (
                          <span className="text-black mt-1">Pick a date</span>
                        )}
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      disabled={(day) => ValiDate(day)}
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      className="w-full"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white h-14">
            Tìm kiếm
          </Button>
        </div>
      </div>
    </form>
  );
}

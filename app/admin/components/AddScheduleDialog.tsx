"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const tempTrains = ["SE1", "SE2", "SE3", "SE4", "SE5"];
const tempStations = ["Hà Nội", "Đà Nẵng", "Huế", "Nha Trang", "Sài Gòn"];
interface RouteData {
  departure: string;
  arrival: string;
}
const tempRoutes: RouteData[] = [
  { departure: "Hà Nội", arrival: "Đà Nẵng" },
  { departure: "Hà Nội", arrival: "Huế" },
  { departure: "Hà Nội", arrival: "Sài Gòn" },
  { departure: "Đà Nẵng", arrival: "Huế" },
  { departure: "Đà Nẵng", arrival: "Nha Trang" },
  { departure: "Đà Nẵng", arrival: "Sài Gòn" },
  { departure: "Huế", arrival: "Nha Trang" },
  { departure: "Huế", arrival: "Sài Gòn" },
  { departure: "Nha Trang", arrival: "Sài Gòn" },
];
const AddScheduleDialog: React.FC = () => {
  const [formData, setFormData] = useState({
    trainName: "",
    departureTime: "",
    departureStation: "",
    arrivalStation: "",
  });
  const [availableArrivals, setAvailableArrivals] = useState<string[]>([]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "departureStation") {
      const filteredArrivals = tempRoutes
        .filter((route) => route.departure === value)
        .map((route) => route.arrival);
      setAvailableArrivals(filteredArrivals);
      setFormData((prev) => ({ ...prev, arrivalStation: "" }));
    }
  };

  const handleSubmit = () => {
    console.log("Schedule data:", formData);
    // Here you would typically send this data to your backend
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Thêm lịch trình</DialogTitle>
        <DialogDescription>
          Điền thông tin để thêm mới lịch trình.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="trainName" className="text-right">
            Tên tàu
          </Label>
          <Select onValueChange={(value) => handleChange("trainName", value)}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Chọn tàu" />
            </SelectTrigger>
            <SelectContent>
              {tempTrains.map((train) => (
                <SelectItem key={train} value={train}>
                  {train}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="departureTime" className="text-right">
            Thời gian khởi hành
          </Label>
          <Input
            id="departureTime"
            type="datetime-local"
            value={formData.departureTime}
            onChange={(e) => handleChange("departureTime", e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="departureStation" className="text-right">
            Ga đi
          </Label>
          <Select
            onValueChange={(value) => handleChange("departureStation", value)}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Chọn ga đi" />
            </SelectTrigger>
            <SelectContent>
              {tempStations.map((station) => (
                <SelectItem key={station} value={station}>
                  {station}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="arrivalStation" className="text-right">
            Ga đến
          </Label>
          <Select
            onValueChange={(value) => handleChange("arrivalStation", value)}
            disabled={!formData.departureStation}>
            <SelectTrigger className="col-span-3">
              <SelectValue
                placeholder={
                  formData.departureStation ? "Chọn ga đến" : "Hãy chọn ga đi"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {availableArrivals.map((station) => (
                <SelectItem key={station} value={station}>
                  {station}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" className="w-full" onClick={handleSubmit}>
        Thêm lịch trình
      </Button>
    </DialogContent>
  );
};
export default AddScheduleDialog;

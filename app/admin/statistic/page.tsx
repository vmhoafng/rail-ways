"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import {
  format,
  parse,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
  startOfYear,
  endOfYear,
} from "date-fns";
import statisticApiRequest from "@/app/apiRequests/statistic";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StatisticsData {
  revenue: number;
  hours?: string;
  amount: number;
  date?: string;
  month?: string;
  year?: string;
}

const fetchStatistics = async (
  type: "hourly" | "daily" | "monthly",
  date: string,
  accessToken: string | null
): Promise<StatisticsData[]> => {
  const [year, month, day] = date.split("-");

  switch (type) {
    case "hourly":
      const dayData = await statisticApiRequest.getRevenueInDay(accessToken, {
        year,
        month,
        day,
      });
      console.log(dayData);

      return dayData.payload.result.map((item: any) => ({
        revenue: item.revenue,
        hours: item.hours,
        amount: item.amount,
      }));
    case "daily":
      const monthData = await statisticApiRequest.getRevenueInMonth(
        accessToken,
        { year, month }
      );
      return monthData.payload.result.map((item: any) => ({
        revenue: item.revenue,
        date: item.date,
        amount: item.amount,
      }));
    case "monthly":
      const yearData = await statisticApiRequest.getRevenueInYear(accessToken, {
        year,
      });
      return yearData.payload.result.map((item: any) => ({
        revenue: item.revenue,
        month: item.month,
        amount: item.amount,
      }));
    default:
      throw new Error("Invalid type");
  }
};

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState<"hourly" | "daily" | "monthly">(
    "hourly"
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const accessToken = localStorage.getItem("accessToken") || "";
        const data = await fetchStatistics(
          timeRange,
          selectedDate,
          accessToken
        );
        console.log(data);

        updateChartData(data);
      } catch (err) {
        setError("Failed to load statistics data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [timeRange, selectedDate]);

  const updateChartData = (data: StatisticsData[]) => {
    setChartData({
      labels: data.map((item) => item.hours || item.date || item.month || ""),
      datasets: [
        {
          label: "Doanh thu (VNĐ)",
          data: data.map((item) => item.revenue),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          yAxisID: "y",
        },
        {
          label: "Số lượng vé",
          data: data.map((item) => item.amount),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          yAxisID: "y1",
        },
      ],
    });
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: `Thống kê ${
          timeRange === "hourly"
            ? "theo giờ"
            : timeRange === "daily"
            ? "theo ngày"
            : "theo tháng"
        }`,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Doanh thu (VNĐ)",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Số lượng vé",
        },
      },
    },
  };

  const generateDateOptions = () => {
    switch (timeRange) {
      case "hourly":
        return Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return (
            <SelectItem key={i} value={format(date, "yyyy-MM-dd")}>
              {format(date, "dd/MM/yyyy")}
            </SelectItem>
          );
        });
      case "daily":
        return Array.from({ length: 12 }, (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          return (
            <SelectItem key={i} value={format(date, "yyyy-MM")}>
              {format(date, "MM/yyyy")}
            </SelectItem>
          );
        });
      case "monthly":
        return Array.from({ length: 5 }, (_, i) => {
          const year = new Date().getFullYear() - i;
          return (
            <SelectItem key={i} value={year.toString()}>
              {year}
            </SelectItem>
          );
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Thống kê Doanh thu và Vé đặt</h1>
      <Card>
        <CardHeader>
          <CardTitle>Biểu đồ Thống kê</CardTitle>
          <CardDescription>
            Xem doanh thu và số lượng vé đặt theo thời gian
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={timeRange}
            onValueChange={(value) =>
              setTimeRange(value as "hourly" | "daily" | "monthly")
            }>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hourly">Theo giờ</TabsTrigger>
              <TabsTrigger value="daily">Theo ngày</TabsTrigger>
              <TabsTrigger value="monthly">Theo tháng</TabsTrigger>
            </TabsList>
            <TabsContent value={timeRange}>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={`Chọn ${
                      timeRange === "hourly"
                        ? "ngày"
                        : timeRange === "daily"
                        ? "tháng"
                        : "năm"
                    }`}
                  />
                </SelectTrigger>
                <SelectContent>{generateDateOptions()}</SelectContent>
              </Select>
            </TabsContent>
          </Tabs>
          <div className="h-[400px] mt-4">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && chartData && (
              <Line options={options} data={chartData} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

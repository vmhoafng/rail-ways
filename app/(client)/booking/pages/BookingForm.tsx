"use client";

import { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SeatMap from "../components/SeatMap";
import CustomerInfo from "../components/CustomerInfo";
import TripInfo from "../components/TripInfo";
import PriceSummary from "../components/PriceSummary";
import TripInfoCard from "../components/TripInfoCard";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useSeatsContext } from "@/app/context/SeatsContext";
import { PaymentMethodSelector } from "../components/PaymentMethodSelector";
import { useScheduleContext } from "@/app/context/ScheduleContext";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import orderApiRequest from "@/app/apiRequests/order";
import { useToast } from "@/hooks/use-toast";

export default function BookingForm() {
  const { getTrainInfo, updateSelectedSeats, trains } = useSeatsContext();
  const { schedule } = useScheduleContext();
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const trainID = searchParams.get("trainID");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<any>({});
  const [price, setPrice] = useState(0);
  const [step, setStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("MOMO");
  const isHavingRoundTrip = searchParams.get("isHaveRoundTrip");
  const router = useRouter();
  const { toast } = useToast();

  const handleSeatSelect = (seatNumber: number) => {
    setSelectedSeat(seatNumber);
    setPrice(150000);
  };

  const handleInfoChange = (field: string, value: string) => {
    setCustomerInfo((prev: any) => ({ ...prev, [field]: value }));

    // Perform validation
    if (field === "name") {
      if (!value || value.trim() === "" || value.length < 2) {
        setError("Tên không được bỏ trống và phải có ít nhất 2 ký tự.");
      } else {
        setError(null);
      }
    }

    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || value.trim() === "" || !emailRegex.test(value)) {
        setError("Email không được bỏ trống và phải hợp lệ.");
      } else {
        setError(null);
      }
    }

    if (field === "phone") {
      const phoneRegex = /^(0|\+84)[1-9][0-9]{8}$/;
      if (!value || value.trim() === "" || !phoneRegex.test(value)) {
        setError("Số điện thoại không được bỏ trống và phải hợp lệ.");
      } else {
        setError(null);
      }
    }
  };

  const handleSubmit = async () => {
    // Ensure all required fields are valid
    if (!customerInfo.name || customerInfo.name.trim() === "" || customerInfo.name.length < 2) {
      toast({
        title: "Lỗi thông tin",
        description: "Tên không được bỏ trống và phải có ít nhất 2 ký tự.",
        duration: 3000,
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerInfo.email || customerInfo.email.trim() === "" || !emailRegex.test(customerInfo.email)) {
      toast({
        title: "Lỗi thông tin",
        description: "Email không được bỏ trống và phải hợp lệ.",
        duration: 3000,
        variant: "destructive",
      });
      return;
    }

    const phoneRegex = /^(0|\+84)[1-9][0-9]{8}$/;
    if (!customerInfo.phone || customerInfo.phone.trim() === "" || !phoneRegex.test(customerInfo.phone)) {
      toast({
        title: "Lỗi thông tin",
        description: "Số điện thoại không được bỏ trống và phải hợp lệ.",
        duration: 3000,
        variant: "destructive",
      });
      return;
    }

    setError(null); // Clear any existing errors

    const data = {
      orderNumber: new Date().getTime(),
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      totalPrice:
        isHavingRoundTrip === "false"
          ? trains[0].selectedSeats
            .map((seat) => seat.price)
            .reduce((sum, num) => sum + num, 0)
          : trains[0].selectedSeats
            .map((seat) => seat.price)
            .reduce((sum, num) => sum + num, 0) +
          trains[1]?.selectedSeats
            .map((seat) => seat.price)
            .reduce((sum, num) => sum + num, 0),
      scheduleId: trains[0].trainId,
      departureStationId: schedule[0]?.departureStationId,
      arrivalStationId: schedule[0]?.arrivalStationId,
      orderItems: [
        ...trains[0].selectedSeats.map((seat) => ({
          seatId: seat.seatNumber.split(".")[1],
          price: seat.price,
        })),
      ],
      isHaveRoundTrip: isHavingRoundTrip,
      roundTripScheduleId: schedule[1]?.trainId,
      roundTripItems:
        isHavingRoundTrip === "true"
          ? [
            ...trains[1]?.selectedSeats.map((seat) => ({
              seatId: seat.seatNumber.split(".")[1],
              price: seat.price,
            })),
          ]
          : undefined,
      paymentMethod: paymentMethod,
    };

    try {
      const token = localStorage.getItem("accessToken");
      let result;
      if (token) {
        result = await orderApiRequest.payment.login(data, token);
      } else {
        result = await orderApiRequest.payment.anonymous(data);
      }
      localStorage.setItem("data", JSON.stringify(data));
      router.push("/Booking/verify-token-payment");
      console.log("Booking successful:", result);
    } catch (err) {
      console.error("Booking failed:", err);
      toast({
        title: "Lỗi đặt vé",
        description: "Đã xảy ra lỗi khi đặt vé. Vui lòng thử lại.",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  const steps = [
    { id: 1, title: "CHỌN GHẾ" },
    { id: 2, title: "THÔNG TIN KHÁCH HÀNG" },
    { id: 3, title: "ĐIỂM ĐÓN/TRẢ" },
    { id: 4, title: "THANH TOÁN" },
  ];

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:grid md:container-custom grid-cols-3 gap-x-4 items-start justify-stretch">
        <div className="space-y-4 col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Đặt vé tàu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isHavingRoundTrip === "false" ? (
                <SeatMap
                  trainId={trains[0]?.trainId}
                  onSeatSelect={handleSeatSelect}
                />
              ) : (
                <>
                  <h3 className="font-bold text-lg">Chuyến đi</h3>
                  <SeatMap
                    trainId={trains[0]?.trainId}
                    onSeatSelect={handleSeatSelect}
                  />{" "}
                  <h3 className="font-bold text-lg">Chuyến về</h3>
                  <SeatMap
                    trainId={trains[1] && trains[1]?.trainId}
                    onSeatSelect={handleSeatSelect}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <div className="space-y-4">
            {isHavingRoundTrip === "false" ? (
              <TripInfoCard
                trip="outbound"
                route={`${schedule[0]?.departureStationName} - ${schedule[0]?.arrivalStationName}`}
                departureTime={`${format(
                  schedule[0]?.departureTime,
                  "EEEE, dd/MM",
                  {
                    locale: vi,
                  }
                ).toUpperCase()!}`}
                seatCount={trains[0]?.selectedSeats.length}
                dropOffPoint={schedule[0]?.arrivalStationName}
                totalCost={trains[0].selectedSeats
                  .map((seat) => seat.price)
                  .reduce((sum, num) => sum + num, 0)}
              />
            ) : (
              <>
                <TripInfoCard
                  trip="outbound"
                  route={`${schedule[0][0]?.departureStationName} - ${schedule[0][0]?.arrivalStationName}`}
                  departureTime={`${format(
                    schedule[0][0]?.departureTime,
                    "EEEE, dd/MM",
                    {
                      locale: vi,
                    }
                  ).toUpperCase()!}`}
                  seatCount={trains[0]?.selectedSeats.length}
                  dropOffPoint={schedule[0][0]?.arrivalStationName}
                  totalCost={trains[0].selectedSeats
                    .map((seat) => seat.price)
                    .reduce((sum, num) => sum + num, 0)}
                />{" "}
                <TripInfoCard
                  trip="return"
                  route={`${schedule[1][0]?.departureStationName} - ${schedule[1][0]?.arrivalStationName}`}
                  departureTime={`${format(
                    schedule[1][0]?.departureTime,
                    "EEEE, dd/MM",
                    {
                      locale: vi,
                    }
                  ).toUpperCase()!}`}
                  seatCount={trains[1] && trains[1]?.selectedSeats.length}
                  dropOffPoint={schedule[1][0]?.arrivalStationName}
                  totalCost={
                    trains[1] &&
                    trains[1].selectedSeats
                      .map((seat) => seat.price)
                      .reduce((sum, num) => sum + num, 0)
                  }
                />
              </>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Phương thức thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CustomerInfo onInfoChange={handleInfoChange} />
              <PriceSummary
                price={
                  isHavingRoundTrip === "false"
                    ? trains[0].selectedSeats
                      .map((seat) => seat.price)
                      .reduce((sum, num) => sum + num, 0)
                    : trains[0].selectedSeats
                      .map((seat) => seat.price)
                      .reduce((sum, num) => sum + num, 0) +
                    trains[1]?.selectedSeats
                      .map((seat) => seat.price)
                      .reduce((sum, num) => sum + num, 0)
                }
              />
              <PaymentMethodSelector onSelect={setPaymentMethod} />
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubmit}>
                Xác nhận đặt vé
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden min-h-screen bg-gray-50">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 bg-white z-10">
          <div className="flex items-center justify-between px-4 py-2 text-xs border-b">
            {steps.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "flex items-center",
                  step === s.id ? "text-primary" : "text-gray-400"
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center border",
                    step === s.id
                      ? "border-primary text-primary"
                      : "border-gray-300"
                  )}
                >
                  {s.id}
                </div>
                <span className="ml-1 hidden sm:inline">{s.title}</span>
                {i < steps.length - 1 && (
                  <div className="w-8 h-px bg-gray-300 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="pt-16 px-4 pb-24">
          {step === 1 && (
            <div className="space-y-6">
              <SeatMap trainId={trains} onSeatSelect={handleSeatSelect} />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <CustomerInfo onInfoChange={handleInfoChange} />
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <TripInfo departure="Sài Gòn" arrival="Hà Nội" />
            </div>
          )}
          {step === 4 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Phương thức thanh toán</CardTitle>
                </CardHeader>
                <CardContent>
                  <PaymentMethodSelector onSelect={setPaymentMethod} />
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Mobile Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">
              Vé chiều đi ({selectedSeats.length})
            </span>
            <span className="text-sm font-medium">
              {price.toLocaleString("vi-VN")}đ
            </span>
          </div>
          <Button
            className="w-full bg-orange-600 hover:bg-orange-500"
            size="lg"
            onClick={() => {
              if (step < 4) {
                setStep((prev) => prev + 1);
              } else {
                handleSubmit();
              }
            }}
          >
            {step < 4 ? "Tiếp tục" : "Xác nhận đặt vé"}
          </Button>
        </div>
      </div>
    </>
  );
}

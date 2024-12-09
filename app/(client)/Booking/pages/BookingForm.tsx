"use client";

import { useEffect, useState } from "react";
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
import { useSearchParams } from "next/navigation";
import { useSeatsContext } from "@/app/context/SeatsContext";
import { PaymentMethodSelector } from "../components/PaymentMethodSelector";


export default function BookingForm() {
    const { getTrainInfo, updateSelectedSeats, trains } = useSeatsContext();
    const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const trainID = searchParams.get("trainID");
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [customerInfo, setCustomerInfo] = useState({});
    const [price, setPrice] = useState(0);
    const [step, setStep] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [paymentMethod, setPaymentMethod] = useState('momo');

    const fetchSchedule = async (id: any) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/schedule/anonymous/get-schedule/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setSchedule(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSchedule(13);
    }, []);

    const handleSeatSelect = (seatNumber: number) => {
        setSelectedSeat(seatNumber);
        setPrice(150000);
    };

    const handleInfoChange = (field: string, value: string) => {
        setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        console.log("Booking submitted", { selectedSeat, customerInfo, price, paymentMethod });
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
                            <SeatMap onSeatSelect={handleSeatSelect} />
                            <CustomerInfo onInfoChange={handleInfoChange} />
                            <TripInfo departure="Sài Gòn" arrival="Hà Nội" />
                            <PriceSummary price={price} />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-3">
                    <div className="space-y-4">
                        <TripInfoCard
                            route="Sai Gon - Ha Noi"
                            departureTime="00:02 01/11/2024"
                            seatCount={selectedSeat ? 1 : 0}
                            dropOffPoint="Đà Lạt"
                            totalCost={price}
                        />
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Phương thức thanh toán</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PaymentMethodSelector onSelect={setPaymentMethod} />
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={handleSubmit}>Xác nhận đặt vé</Button>
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
                            <SeatMap onSeatSelect={handleSeatSelect} />
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


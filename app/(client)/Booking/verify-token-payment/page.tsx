"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import apiRequest from "@/app/apiRequests/order";

export default function VerifyTokenPaymentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();

    const [token, setToken] = useState(""); // User-input token
    const [isLoading, setLoading] = useState(false);


    const addTokenToBookingData = (token: string) => {
        const storedData = localStorage.getItem("data");
        if (!storedData) {
            toast({
                variant: "destructive",
                description: "No booking data found in localStorage.",
            });
            return null;
        }

        const bookingData = JSON.parse(storedData);
        bookingData.token = token; // Add token to bookingData

        localStorage.setItem("data", JSON.stringify(bookingData)); // Save back to localStorage
        return bookingData;
    };

    const handleVerifyAndSubmit = async () => {
        if (isLoading) return; // Prevent multiple submissions


        setLoading(true);

        try {
            // Add token to booking data
            const bookingData = addTokenToBookingData(token);
            if (!bookingData) return; // Exit if data is not found

            // Submit booking data with token
            const accessToken = localStorage.getItem("accessToken");
            let response
            if (accessToken) {
                response = await apiRequest.payment.login(bookingData, accessToken);
            }
            else {
                response = await apiRequest.payment.anonymous(bookingData);
            }
            toast({
                description: "Booking confirmed! Redirecting...",
                duration: 2000,
            });
            const linkpay = response.payload.result.message;
            router.push(linkpay);

        } catch (error: any) {
            console.error("Error during booking:", error);
            toast({
                variant: "destructive",
                description: error?.message || "Failed to process booking.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white rounded-lg shadow-lg flex flex-col gap-4">
                <h1 className="text-xl font-bold text-gray-800 text-center">
                    Enter Verification Code
                </h1>
                <Input
                    placeholder="Enter the code sent to your email"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    disabled={isLoading}
                    className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
                <Button
                    onClick={handleVerifyAndSubmit}
                    disabled={isLoading || !token.trim()}
                    className="bg-orange-500 hover:bg-orange-400 text-white w-full py-2 rounded-lg font-semibold"
                >
                    {isLoading ? "Processing..." : "Verify and Submit"}
                </Button>
            </div>
        </div>
    );
}

"use client";
import { PassengerInfo } from "../../../components/PassengerInfo";
import { PaymentSummary } from "../../../components/PaymentSummary";
import { Button } from "../../../components/Button";
import { PromoCodeInput } from "../../../components/PromoCodeInput";
import { useSeatsContext } from "@/app/context/SeatsContext";
import Seats from "@/app/components/Seats";
import { useRouter } from "next/router";

interface BookingPageProps {
  params: { id: string };
}
export default function BookingPage({ params }: BookingPageProps) {
  const { id } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Loại vé</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Seats trainId={id} />
          <PassengerInfo />
          <PromoCodeInput />
        </div>
        <div>
          <PaymentSummary />
          <Button className="w-full mt-6">Xác nhận</Button>
        </div>
      </div>
    </div>
  );
}

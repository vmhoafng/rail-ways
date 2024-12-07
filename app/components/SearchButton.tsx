"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useJourneyContext } from "../context/JourneyContext";
import { useEffect } from "react";

export default function SearchButton() {
  const router = useRouter();
  const { outboundTrainId, returnTrainId } = useJourneyContext();
  useEffect(() => {
    if (outboundTrainId || returnTrainId) {
      router.push(
        `/Booking?outbound=${outboundTrainId}&return=${returnTrainId}`
      );
    } else {
      alert("Vui lòng chọn cả chuyến đi và chuyến về trước khi tìm kiếm.");
    }
  }, [outboundTrainId, returnTrainId]);
  const handleSearch = () => {};

  return (
    <Button
      onClick={handleSearch}
      className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md">
      Tìm chuyến
    </Button>
  );
}

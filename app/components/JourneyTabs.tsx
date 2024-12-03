import { cn } from "@/lib/utils";
import { useJourneyContext } from "../context/JourneyContext";

interface JourneyTabsProps {
  activeTab: "outbound" | "return";
  onTabChange: (tab: "outbound" | "return") => void;
  outboundDate: string;
  returnDate: string;
}

export default function JourneyTabs({
  activeTab,
  onTabChange,
  outboundDate,
  returnDate,
}: JourneyTabsProps) {
  return (
    <div className="flex w-full border-b">
      <button
        onClick={() => onTabChange("outbound")}
        className={cn(
          "flex-1 py-4 text-center transition-colors",
          activeTab === "outbound"
            ? "border-b-2 border-orange-500 text-orange-500 font-medium"
            : "text-gray-500 hover:text-gray-700"
        )}>
        <div className="text-sm sm:text-base">CHUYẾN ĐI - {outboundDate}</div>
      </button>
      <button
        onClick={() => onTabChange("return")}
        className={cn(
          "flex-1 py-4 text-center transition-colors",
          activeTab === "return"
            ? "border-b-2 border-orange-500 text-orange-500 font-medium"
            : "text-gray-500 hover:text-gray-700"
        )}>
        <div className="text-sm sm:text-base">CHUYẾN VỀ - {returnDate}</div>
      </button>
    </div>
  );
}

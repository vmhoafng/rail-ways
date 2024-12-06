import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { tabContent, TabContentType } from "../page";

interface MobileNavProps {
  activeTab: keyof TabContentType;
  setActiveTab: React.Dispatch<React.SetStateAction<keyof TabContentType>>;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="md:hidden">
        <Menu className="h-4 w-4" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <SheetHeader>
        <SheetTitle>Danh mục quản lý</SheetTitle>
        <SheetDescription>Chọn mục quản lý bạn muốn xem</SheetDescription>
      </SheetHeader>
      <div className="mt-4 space-y-2">
        {Object.entries(tabContent).map(([key, { title, icon }]) => (
          <Button
            key={key}
            variant={activeTab === key ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab(key as keyof TabContentType);
              const closeButton = document.querySelector(
                'button[aria-label="Close"]'
              );
              if (closeButton instanceof HTMLElement) {
                closeButton.click();
              }
            }}>
            {icon}
            <span className="ml-2">{title}</span>
          </Button>
        ))}
      </div>
    </SheetContent>
  </Sheet>
);
export default MobileNav;

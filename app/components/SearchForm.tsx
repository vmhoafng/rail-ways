import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Train, Car, Plane, Bus } from "lucide-react";

export default function SearchForm() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center space-x-2 p-2 bg-gray-100">
        <Button
          variant="ghost"
          className="flex items-center space-x-2 text-orange-500">
          <Train className="h-4 w-4" />
          <span>Tàu hoả</span>
        </Button>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Car className="h-4 w-4" />
          <span>Vé tàu hoả</span>
        </Button>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Car className="h-4 w-4" />
          <span>Thuê xe</span>
        </Button>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Plane className="h-4 w-4" />
          <span>Xe sân bay</span>
        </Button>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Bus className="h-4 w-4" />
          <span>Xe buýt & tàu sân bay</span>
        </Button>

        <Button variant="ghost" className="flex items-center space-x-2">
          <Car className="h-4 w-4" />
          <span>Thuê xe riêng</span>
        </Button>
      </div>
      <div className="p-6">
        <RadioGroup defaultValue="japan" className="flex space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="japan" id="japan" />
            <Label htmlFor="japan">Tàu hoả Nhật Bản</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="europe" id="europe" />
            <Label htmlFor="europe">Vé tàu Châu Âu</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hongkong" id="hongkong" />
            <Label htmlFor="hongkong">Tàu cao tốc Hồng Kông</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="taiwan" id="taiwan" />
            <Label htmlFor="taiwan">Vé tàu Đài Loan</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Khác</Label>
          </div>
        </RadioGroup>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <Label htmlFor="from">Từ</Label>
            <Input id="from" placeholder="Tokyo" className="mt-1" />
          </div>
          <div className="col-span-1">
            <Label htmlFor="to">Đến</Label>
            <Input id="to" placeholder="Osaka" className="mt-1" />
          </div>
          <div className="col-span-1">
            <Label htmlFor="date">Ngày khởi hành</Label>
            <div className="relative mt-1">
              <Input id="date" placeholder="26/10/2024" className="pl-10" />
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>
        <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white">
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
}

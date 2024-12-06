"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Train,
  Users,
  MapPin,
  Ticket,
  CreditCard,
  Route,
  Box,
  Plus,
  Search,
  Menu,
  Pencil,
  Calendar,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TabContentItem {
  title: string;
  icon: React.ReactNode;
  fields: string[];
  data: Record<string, string | number>[];
}

type TabContentType = Record<string, TabContentItem>;

const tabContent: TabContentType = {
  trains: {
    title: "Quản lý Tàu",
    icon: <Train className="w-4 h-4" />,
    fields: ["mã tàu", "tên tàu", "loại tàu", "vị trí hiện tại"],
    data: [
      {
        id: "T001",
        matau: "T001",
        tentau: "SE1",
        loaitau: "Tàu Nhanh",
        vitrihientai: "Ga Hà Nội",
      },
      {
        id: "T002",
        matau: "T002",
        tentau: "SE2",
        loaitau: "Tàu Nhanh",
        vitrihientai: "Ga Hà Nội",
      },
      {
        id: "T003",
        matau: "T003",
        tentau: "TN1",
        loaitau: "Tàu Thường",
        vitrihientai: "Ga Hà Nội",
      },
    ],
  },
  carriages: {
    title: "Quản lý Toa",
    icon: <Box className="w-4 h-4" />,
    fields: ["mã toa", "loại toa", "số ghế"],
    data: [
      { id: "C001", matoa: "C001", loaitoa: "Giường Nằm", soghe: 30 },
      { id: "C002", matoa: "C002", loaitoa: "Ghế Ngồi Mềm", soghe: 64 },
      { id: "C003", matoa: "C003", loaitoa: "Ghế Ngồi Cứng", soghe: 80 },
    ],
  },
  stations: {
    title: "Quản lý Ga",
    icon: <MapPin className="w-4 h-4" />,
    fields: ["mã ga", "tên ga", "địa chỉ"],
    data: [
      {
        id: "ST001",
        maga: "ST001",
        tenga: "Ga Hà Nội",
        diachi: "120 Lê Duẩn, Hà Nội",
      },
      {
        id: "ST002",
        maga: "ST002",
        tenga: "Ga Sài Gòn",
        diachi: "1 Nguyễn Thông, Quận 3, TP.HCM",
      },
      {
        id: "ST003",
        maga: "ST003",
        tenga: "Ga Đà Nẵng",
        diachi: "202 Hải Phòng, Đà Nẵng",
      },
    ],
  },
  tickets: {
    title: "Quản lý Vé",
    icon: <Ticket className="w-4 h-4" />,
    fields: ["mã vé", "mã chuyến", "giá"],
    data: [
      { id: "TK001", mave: "TK001", machuyen: "TR001", gia: "500000" },
      { id: "TK002", mave: "TK002", machuyen: "TR002", gia: "450000" },
      { id: "TK003", mave: "TK003", machuyen: "TR003", gia: "600000" },
    ],
  },
  users: {
    title: "Quản lý Người Dùng",
    icon: <Users className="w-4 h-4" />,
    fields: ["id", "tên", "email"],
    data: [
      {
        id: "U001",
        ma: "U001",
        ten: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
      },
      {
        id: "U002",
        ma: "U002",
        ten: "Trần Thị B",
        email: "tranthib@example.com",
      },
      { id: "U003", ma: "U003", ten: "Lê Văn C", email: "levanc@example.com" },
    ],
  },
  routes: {
    title: "Quản lý Tuyến Đường",
    icon: <Route className="w-4 h-4" />,
    fields: ["mã tuyến", "ga đi", "ga đến"],
    data: [
      { id: "R001", matuyen: "R001", gadi: "Ga Hà Nội", gaden: "Ga Sài Gòn" },
      { id: "R002", matuyen: "R002", gadi: "Ga Sài Gòn", gaden: "Ga Đà Nẵng" },
      { id: "R003", matuyen: "R003", gadi: "Ga Đà Nẵng", gaden: "Ga Hà Nội" },
    ],
  },
};

interface ItemDialogProps {
  fields: string[];
  title: string;
  initialData?: Record<string, string | number>;
  onSubmit: (data: Record<string, string | number>) => void;
}

const ItemDialog: React.FC<ItemDialogProps> = ({
  fields,
  title,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Record<string, string | number>>(
    initialData || {}
  );

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {initialData ? `Sửa ${title}` : `Thêm mới ${title}`}
        </DialogTitle>
        <DialogDescription>
          {initialData
            ? `Chỉnh sửa thông tin ${title.toLowerCase()}.`
            : `Điền thông tin để thêm mới ${title.toLowerCase()}.`}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {fields.map((field, index) => (
          <div key={index} className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor={removeAccents(field.toLowerCase().replace(/ /g, ""))}
              className="text-right">
              {field}
            </Label>
            <Input
              id={removeAccents(field.toLowerCase().replace(/ /g, ""))}
              value={
                formData[removeAccents(field.toLowerCase().replace(/ /g, ""))] ||
                ""
              }
              onChange={(e) =>
                handleChange(
                  removeAccents(field.toLowerCase().replace(/ /g, "")),
                  e.target.value
                )
              }
              className="col-span-3"
            />
          </div>
        ))}
      </div>
      <Button type="submit" className="w-full" onClick={handleSubmit}>
        {initialData ? "Cập nhật" : "Thêm mới"}
      </Button>
    </DialogContent>
  );
};

interface DataTableProps {
  fields: string[];
  data: Record<string, string | number>[];
  onEdit: (item: Record<string, string | number>) => void;
}

function removeAccents(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

const DataTable: React.FC<DataTableProps> = ({ fields, data, onEdit }) => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          {fields.map((field, index) => (
            <TableHead key={index}>{field}</TableHead>
          ))}
          <TableHead>Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            {fields.map((field, fieldIndex) => {
              return (
                <TableCell key={fieldIndex}>
                  {item[removeAccents(field.toLowerCase().replace(/ /g, ""))]}
                </TableCell>
              );
            })}
            <TableCell>
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto">
                      <Pencil className="w-4 h-4 mr-2" />
                      Sửa
                    </Button>
                  </DialogTrigger>
                  <ItemDialog
                    fields={fields}
                    title={fields[0]}
                    initialData={item}
                    onSubmit={(data) => onEdit(data)}
                  />
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full sm:w-auto">
                  Xóa
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

interface TabContentProps {
  tab: keyof TabContentType;
}

const TabContent: React.FC<TabContentProps> = ({ tab }) => {
  const { title, fields, data: initialData } = tabContent[tab];
  const [data, setData] = useState(() => initialData);

  React.useEffect(() => {
    setData(initialData);
  }, [tab]);

  const handleAdd = (newItem: Record<string, string | number>) => {
    setData([...data, newItem]);
  };

  const handleEdit = (editedItem: Record<string, string | number>) => {
    setData(
      data.map((item) => (item.id === editedItem.id ? editedItem : item))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Thêm mới {title}
            </Button>
          </DialogTrigger>
          <ItemDialog fields={fields} title={title} onSubmit={handleAdd} />
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={`Tìm kiếm ${title.toLowerCase()}...`}
              className="flex-1"
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable fields={fields} data={data} onEdit={handleEdit} />
        </CardContent>
      </Card>
    </div>
  );
};

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

interface RouteData {
  departure: string;
  arrival: string;
}

const tempTrains = ["SE1", "SE2", "SE3", "SE4", "SE5"];
const tempStations = ["Hà Nội", "Đà Nẵng", "Huế", "Nha Trang", "Sài Gòn"];
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

export default function AdminDashboardWithSchedule() {
  const [activeTab, setActiveTab] =
    React.useState<keyof TabContentType>("trains");

  return (
    <div className="container-custom mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Trang Quản Trị</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Thêm lịch trình
              </Button>
            </DialogTrigger>
            <AddScheduleDialog />
          </Dialog>
        </div>
        <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as keyof TabContentType)}
        className="space-y-4">
        <Card className="hidden md:block">
          <CardContent className="p-2">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
              {Object.entries(tabContent).map(([key, { title, icon }]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex items-center justify-center">
                  {icon}
                  <span className="ml-2 hidden lg:inline">{title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </CardContent>
        </Card>
        <div>
          {Object.keys(tabContent).map((tab) => (
            <TabsContent key={tab} value={tab}>
              <TabContent tab={tab as keyof TabContentType} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

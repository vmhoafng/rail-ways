"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
      fields: ["mã tàu", "tên tàu", "loại tàu"],
      data: [
        { id: "T001", matau: "T001", tentau: "SE1", loaitau: "Tàu Nhanh" },
        { id: "T002", matau: "T002", tentau: "SE2", loaitau: "Tàu Nhanh" },
        { id: "T003", matau: "T003", tentau: "TN1", loaitau: "Tàu Thường" },
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
    seats: {
      title: "Quản lý Ghế",
      icon: <CreditCard className="w-4 h-4" />,
      fields: ["mã ghế", "số ghế", "loại ghế"],
      data: [
        { id: "S001", maghe: "S001", soghe: "1A", loaighe: "Giường Nằm" },
        { id: "S002", maghe: "S002", soghe: "2B", loaighe: "Ghế Ngồi Mềm" },
        { id: "S003", maghe: "S003", soghe: "3C", loaighe: "Ghế Ngồi Cứng" },
      ],
    },
    stations: {
      title: "Quản lý Ga",
      icon: <MapPin className="w-4 h-4" />,
      fields: ["mã ga", "tên ga", "địa chỉ"],
      data: [
        { id: "ST001", maga: "ST001", tenga: "Ga Hà Nội", diachi: "120 Lê Duẩn, Hà Nội" },
        { id: "ST002", maga: "ST002", tenga: "Ga Sài Gòn", diachi: "1 Nguyễn Thông, Quận 3, TP.HCM" },
        { id: "ST003", maga: "ST003", tenga: "Ga Đà Nẵng", diachi: "202 Hải Phòng, Đà Nẵng" },
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
        { id: "U001", ma: "U001", ten: "Nguyễn Văn A", email: "nguyenvana@example.com" },
        { id: "U002", ma: "U002", ten: "Trần Thị B", email: "tranthib@example.com" },
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
              htmlFor={removeAccents(field.toLowerCase().replace(" ", ""))}
              className="text-right">
              {field}
            </Label>
            <Input
              id={removeAccents(field.toLowerCase().replace(" ", ""))}
              value={
                formData[removeAccents(field.toLowerCase().replace(" ", ""))] ||
                ""
              }
              onChange={(e) =>
                handleChange(
                  removeAccents(field.toLowerCase().replace(" ", "")),
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
    .normalize("NFD") // Chia nhỏ các ký tự thành ký tự cơ bản và các dấu
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
    .replace(/đ/g, "d") // Thay thế 'đ' thành 'd'
    .replace(/Đ/g, "D"); // Thay thế 'Đ' thành 'D'
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
              console.log();
              return (
                <TableCell key={fieldIndex}>
                  {item[removeAccents(field.toLowerCase().replace(" ", ""))]}
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

export default function AdminDashboardWithEdit() {
  const [activeTab, setActiveTab] =
    React.useState<keyof TabContentType>("trains");

  return (
    <div className="container-custom mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Trang Quản Trị</h1>
        <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as keyof TabContentType)}
        className="space-y-4">
        <Card className="hidden md:block">
          <CardContent className="p-2">
            <TabsList className="grid grid-cols-2 md:grid-cols-7 gap-2">
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

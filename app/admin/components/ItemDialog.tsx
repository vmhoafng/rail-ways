"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

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
                formData[
                  removeAccents(field.toLowerCase().replace(/ /g, ""))
                ] || ""
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
export default ItemDialog;

import React, { useState } from "react";
import DataTable from "./DataTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Field {
  name: string;
  label: string;
  type: string;
}

interface TabContentProps<T> {
  title: string;
  displayFields: string[];
  addFields: Field[];
  data: T[];
  onAdd?: (item: T) => void;
  onDelete?: (item: T) => void;
  loading?: boolean;
}

const TabContent = <T,>({
  title,
  displayFields,
  addFields,
  data,
  onAdd,
  onDelete,
  loading,
}: TabContentProps<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<T>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdd) {
      onAdd(formData as T);
    }
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      {loading ? (
        <div>Đang tải dữ liệu...</div>
      ) : (
        <>
          <DataTable fields={displayFields} data={data} onDelete={onDelete} />
          {onAdd && (
            <Button onClick={() => setIsModalOpen(true)}>Thêm mới</Button>
          )}
        </>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm mới {title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            {addFields.map((field) => (
              <div key={field.name} className="mb-4">
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={(formData[field.name as keyof T] as string) || ""}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <DialogFooter>
              <Button type="submit">Lưu</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TabContent;

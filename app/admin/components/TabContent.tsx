import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";
import ItemDialog from "./ItemDialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DataTable from "./DataTable";
import { tabContent, TabContentProps } from "../page";
import adminApiRequests from "@/app/apiRequests/admin";


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
export default TabContent
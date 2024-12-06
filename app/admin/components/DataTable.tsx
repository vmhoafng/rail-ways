import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";
import ItemDialog from "./ItemDialog";
import removeAccents from "./removeAccents";

interface DataTableProps {
  fields: string[];
  data: Record<string, string | number>[];
  onEdit: (item: Record<string, string | number>) => void;
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
export default DataTable
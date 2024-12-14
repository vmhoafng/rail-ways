// src/components/admin/DataTable.tsx
"use-client";
interface DataTableProps<T> {
  fields: string[];
  data: T[];
  onDelete?: (item: T) => void; // Chấp nhận kiểu tổng quát T
}

const DataTable = <T,>({ fields, data, onDelete }: DataTableProps<T>) => {
  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          {fields?.map((field, index) => (
            <th key={index} className="border border-gray-200 px-4 py-2">
              {field}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data?.map((item: any, index) => (
          <tr key={index}>
            {fields.map((field, fieldIndex) => {
              return (
                <td
                  key={fieldIndex}
                  className="border border-gray-200 px-4 py-2">
                  {(item as any)[field] || ""}
                </td>
              );
            })}
            {onDelete && (
              <td className="border border-gray-200 px-4 py-2">
                <button
                  onClick={() => onDelete(item)}
                  className="bg-red-500 text-white px-2 py-1 rounded">
                  Xóa
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;

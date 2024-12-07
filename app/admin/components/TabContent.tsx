// src/components/admin/TabContent.tsx
// src/components/admin/TabContent.tsx
import DataTable from "./DataTable";

interface TabContentProps<T> {
  title: string;
  fields: string[];
  data: T[];
  onAdd?: (item: T) => void;
  onDelete?: (item: T) => void; // Thay đổi kiểu của `onDelete`
  loading?: boolean;
}

const TabContent = <T,>({
  title,
  fields,
  data,
  onAdd,
  onDelete,
  loading,
}: TabContentProps<T>) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      {loading ? (
        <div>Đang tải dữ liệu...</div>
      ) : (
        <>
          <DataTable fields={fields} data={data} onDelete={onDelete} />
          {onAdd && (
            <button
              onClick={() => onAdd({} as T)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Thêm mới
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default TabContent;

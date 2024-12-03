// app/search/layout.tsx
import PageLayout from "@/app/components/layout/PageLayout";

const SearchLayout: React.FC<React.PropsWithChildren<{}>> = async ({
  children,
}) => {
  return (
    <PageLayout header="Thông tin đặt vé">
      {children}
    </PageLayout>
  );
};

export default SearchLayout;

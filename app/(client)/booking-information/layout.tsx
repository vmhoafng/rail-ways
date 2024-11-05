// app/search/layout.tsx
"use client";
import PageLayout from "@/app/components/layout/PageLayout";

const SearchLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <PageLayout header="Thông tin đặt vé">{children}</PageLayout>;
};

export default SearchLayout;

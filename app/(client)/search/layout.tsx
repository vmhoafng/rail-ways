// app/search/layout.tsx
"use client";
import SearchForm from "@/app/components/SearchForm";
import DatePicker from "../../components/DatePicker";
import { TimeFilter } from "../../components/TimeFilter";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FAQAccordion from "@/app/components/FAQAccordion";
import { useState } from "react";
import { apiService } from "@/lib/apiService";
import PageLayout from "@/app/components/layout/PageLayout";
import { JourneyProvider } from "@/app/context/JourneyContext";

const SearchLayout: React.FC<
  React.PropsWithChildren<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <PageLayout header="Tìm kiếm" withSearchForm>
      {children}
    </PageLayout>
  );
};

export default SearchLayout;

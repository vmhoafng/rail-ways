"use client";
import SearchForm from "./components/SearchForm";
import FAQAccordion from "./components/FAQAccordion";

export default function HomePage() {
  return (
    <div className="container-custom mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        "Đặt vé tàu, khởi đầu hành trình – Kết nối mọi miền đất nước!"
      </h1>
      <SearchForm />
      <div className="mt-8">
        <FAQAccordion className="px-8 py-4" />
      </div>
    </div>
  );
}

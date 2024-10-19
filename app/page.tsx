import SearchForm from "./components/SearchForm";
import { FAQAccordion } from "./components/FAQAccordion";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Di chuyển</h1>
      <SearchForm />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Câu hỏi thường gặp</h2>
        <FAQAccordion />
      </div>
    </div>
  );
}

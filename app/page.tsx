import SearchForm from "./components/SearchForm";
import FAQAccordion from "./components/FAQAccordion";
import { getStation } from "./service/station";

export default async function HomePage() {
  const { result } = await getStation();
  console.log(result);

  return (
    <div className="container-custom mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        "Đặt vé tàu, khởi đầu hành trình – Kết nối mọi miền đất nước!"
      </h1>
      <SearchForm stations={result} />
      <div className="mt-8">
        <FAQAccordion className="px-8 py-4" />
      </div>
    </div>
  );
}

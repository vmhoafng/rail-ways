"use client"
import SearchForm from "./components/SearchForm";
import FAQAccordion from "./components/FAQAccordion";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function HomePage() {
  const { toast } = useToast();
  const { setLoggedIn, setProfile, setAccessToken } = useUser();
  useEffect(() => {
    function handleAccessTokenFromUrl() {
      // Kiểm tra nếu đang chạy trên client-side
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');

        if (accessToken) {
          setAccessToken(accessToken);
          toast({
            title: "SUCCESS",
            description: "Đăng nhập thành công",
            duration: 5000,
            variant: "default",
          });
          console.log('Access token saved successfully:', accessToken);
          setLoggedIn(true);
        } else {
          console.log('No access token found in the URL.');
        }
      }
    }

    handleAccessTokenFromUrl(); // Gọi hàm khi component được render
  }, []);
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

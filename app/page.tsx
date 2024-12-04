"use client";
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
          setAccessToken(accessToken); // Lưu accessToken vào context hoặc state
          localStorage.setItem('accessToken', accessToken); // Lưu vào localStorage
          setLoggedIn(true); // Cập nhật trạng thái đăng nhập

          // Xóa query string khỏi URL để bảo mật
          const newUrl = window.location.origin + window.location.pathname;
          window.history.replaceState(null, '', newUrl);

          console.log('Access token saved successfully:', accessToken);
        } else {
          console.log('No access token found in the URL.');
        }
      }
    }

    handleAccessTokenFromUrl(); // Gọi hàm khi component được render
  }, [setAccessToken, setLoggedIn]);

  return (
    <div className="container-custom mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Di chuyển</h1>
      <SearchForm />
      <div className="mt-8">
        <FAQAccordion className="px-8 py-4" />
      </div>
    </div>
  );
}

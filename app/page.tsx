"use client"
import SearchForm from "./components/SearchForm";
import FAQAccordion from "./components/FAQAccordion";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authApiRequest from "./apiRequests/auth";
import { handleErrorApi } from "@/lib/utils";

export default function HomePage() {
  const { toast } = useToast();
  const { setLoggedIn, setProfile, setAccessToken } = useUser();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // Lấy token từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Gọi API lấy thông tin người dùng
      fetchUserInfoAfterGoogleLogin(token);
    };

  }, []);

  const fetchUserInfoAfterGoogleLogin = async (token: string) => {
    try {
      if (isLoading) return; // Prevent multiple submissions
      setLoading(true);
      const results = await authApiRequest.auth.getIntoLoginGoogle(token);

      const accessToken = results.payload.result?.accessToken;
      const profileData = results.payload.result?.profile;

      if (!accessToken) throw new Error("AccessToken is missing!");
      setAccessToken(accessToken); // Gọi hàm từ UserContext

      if (!profileData) throw new Error("Profile is missing!");
      setProfile(profileData); // Gọi hàm từ UserContext
      console.log(profileData);
      toast({
        title: "SUCCESS",
        description: "Đăng nhập thành công",
        duration: 5000,
        variant: "default",
      });

      setLoggedIn(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
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

// components/ButtonLogout.tsx
"use client";

import { useUser } from "@/contexts/UserContext";
import { usePathname, useRouter } from "next/navigation";
import authApiRequest from "@/app/apiRequests/auth";
import { Button } from "@/components/ui/button";
import { clientAccessToken } from "@/lib/http";

export default function ButtonLogout() {
    const { isLoggedIn, setLoggedIn } = useUser();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            // Gọi API đăng xuất
            const accessToken = localStorage.getItem("accessToken");
            await authApiRequest.logout.logout(accessToken);
            console.log("Logged out successfully.");


            localStorage.removeItem("accessToken");
            localStorage.removeItem("accessTokenExpiry");
            // Cập nhật trạng thái và chuyển hướng
            setLoggedIn(false);
            router.push("/auth"); // Quay lại trang đăng nhập
        } catch (error) {
            console.error("Error logging out:", error);
        }
        finally {
            setLoggedIn(false)
            router.refresh()
            clientAccessToken.value = ""
        }

    };

    if (!isLoggedIn) {
        return null; // Không hiển thị nút nếu chưa đăng nhập
    }

    return (
        <Button
            onClick={handleLogout}
            className="bg-orange-500 hover:bg-orange-400 transition-all duration-100"
        >
            Đăng xuất
        </Button>
    );
}

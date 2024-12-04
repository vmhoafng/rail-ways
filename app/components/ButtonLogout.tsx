import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import authApiRequest from "@/app/apiRequests/auth";
import { Button } from "@/components/ui/button";
import { clientAccessToken } from "@/lib/http";

export default function ButtonLogout() {
    const { isLoggedIn, setLoggedIn, setProfile, setAccessToken } = useUser();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Lấy access token từ localStorage
            const accessToken = localStorage.getItem("accessToken");
            console.log("accessToken", accessToken);
            if (accessToken) {
                // Gọi API đăng xuất nếu cần
                await authApiRequest.logout.logout(accessToken);
                console.log("Logged out successfully.");
            }

            // Xóa tất cả thông tin liên quan đến đăng nhập
            localStorage.removeItem("accessToken");
            localStorage.removeItem("accessTokenExpiry");
            setAccessToken(null);
            setProfile(null);

            // Đặt trạng thái không đăng nhập
            setLoggedIn(false);

            // Chuyển hướng về trang đăng nhập
            router.push("/auth");
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            // Đảm bảo làm mới trạng thái và xóa token client
            setLoggedIn(false);
            clientAccessToken.value = "";
            router.refresh();
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

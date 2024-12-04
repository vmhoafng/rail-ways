"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import authApiRequest from "@/app/apiRequests/auth";
import { VerifyTokenBodyType } from "@/app/interfaces";

export default function VerifyTokenPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();

    const email = searchParams.get("email"); // Lấy email từ URL
    const [token, setToken] = useState(""); // Token người dùng nhập
    const [isLoading, setLoading] = useState(false);
    const [tokenExpiration, setTokenExpiration] = useState<number | null>(null); // Thời gian hết hạn token

    // Lấy thời gian hết hạn token (nếu có) từ query params
    useEffect(() => {
        const expirationTime = searchParams.get("expiresAt");
        if (expirationTime) {
            setTokenExpiration(Number(expirationTime));
        }
    }, [searchParams]);

    // Hàm kiểm tra và xử lý xác thực
    const handleVerifyToken = async () => {
        // Kiểm tra điều kiện cơ bản
        if (isLoading) return; // Đang xử lý, không gửi thêm yêu cầu
        if (!email || !token) {
            toast({
                variant: "destructive",
                description: "Vui lòng nhập đầy đủ email và mã xác nhận.",
            });
            return;
        }

        // Nếu token đã hết hạn
        if (tokenExpiration && Date.now() > tokenExpiration) {
            toast({
                variant: "destructive",
                description: "Mã xác thực đã hết hạn. Vui lòng đăng ký lại.",
            });
            router.push("/auth"); // Chuyển hướng về trang đăng ký
            return;
        }

        setLoading(true);
        try {
            const body: VerifyTokenBodyType = {
                email,
                token: parseInt(token),
            };

            await authApiRequest.auth.verifyToken(body);

            toast({
                description: "Xác thực thành công! Đang chuyển hướng...",
                duration: 2000,
            });

            // Chuyển hướng người dùng về trang login
            router.push("/auth");
        } catch (error: any) {
            console.error("Verify Token Error:", error);
            toast({
                variant: "destructive",
                description:
                    error?.message || "Token không hợp lệ hoặc đã hết hạn!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white rounded-lg shadow-lg flex flex-col gap-4">
                <h1 className="text-xl font-bold text-gray-800 text-center">Nhập mã xác nhận</h1>
                <Input
                    placeholder="Nhập mã xác nhận"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    disabled={isLoading}
                    className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
                <Button
                    onClick={handleVerifyToken}
                    disabled={isLoading || !token.trim()}
                    className="bg-orange-500 hover:bg-orange-400 text-white w-full py-2 rounded-lg font-semibold"
                >
                    {isLoading ? "Đang xử lý..." : "Xác nhận"}
                </Button>
            </div>
        </div>

    );
}

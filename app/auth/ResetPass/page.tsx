"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import authApiRequest from "@/app/apiRequests/auth";
import { handleErrorSamePassApi } from "@/lib/utils";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();

    const id = searchParams.get("id");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage("");

        if (password !== confirmPassword) {
            setStatusMessage("Mật khẩu không khớp. Vui lòng thử lại.");
            return;
        }

        try {
            await authApiRequest.password.resetPassword({ id, password });

            setStatusMessage("Mật khẩu của bạn đã được thay đổi thành công.");
            setTimeout(() => router.push("/auth"), 2000); // Quay lại trang đăng nhập
        } catch (error) {
            handleErrorSamePassApi({ error, duration: 5000 });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                className="bg-white p-6 rounded shadow-md w-full max-w-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Đặt lại mật khẩu
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    Vui lòng nhập mật khẩu mới của bạn.
                </p>
                <input
                    type="password"
                    placeholder="Mật khẩu mới"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <button
                    type="submit"
                    className="bg-orange-500 text-white w-full p-2 rounded hover:bg-orange-600"
                >
                    Đặt lại mật khẩu
                </button>
                {statusMessage && (
                    <p className="text-center text-sm mt-4 text-red-600">
                        {statusMessage}
                    </p>
                )}
            </form>
        </div>
    );
}

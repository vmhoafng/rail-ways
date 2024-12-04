"use client";

import authApiRequest from "@/app/apiRequests/auth";
import { useState } from "react";

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage("");

        try {
            await authApiRequest.password.preResetPassword(email);
            setStatusMessage(
                "Yêu cầu của bạn đã được gửi. Vui lòng kiểm tra email để đặt lại mật khẩu."
            );
        } catch (error) {
            console.error("Error:", error);
            setStatusMessage("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                className="bg-white p-6 rounded shadow-md w-full max-w-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Quên mật khẩu
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    Nhập email của bạn để nhận đường dẫn đặt lại mật khẩu.
                </p>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <button
                    type="submit"
                    className="bg-orange-500 text-white w-full p-2 rounded hover:bg-orange-600"
                >
                    Gửi yêu cầu
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

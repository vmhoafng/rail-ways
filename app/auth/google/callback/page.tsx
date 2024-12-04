"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import authApiRequest from "@/app/apiRequests/auth";

const GoogleCallback = () => {
    const router = useRouter();
    const { setAccessToken, setProfile, setLoggedIn } = useUser();

    useEffect(() => {
        const handleGoogleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");

            if (!code) {
                console.error("Code not found in callback URL.");
                router.push("/auth"); // Redirect về login nếu thất bại
                return;
            }

            try {
                const response = await authApiRequest.auth.exchangeGoogleCode({ code });
                const accessToken = response?.payload.result?.accessToken;
                const profile = response?.payload.result?.profile;

                if (!accessToken || !profile) {
                    throw new Error("AccessToken or Profile missing.");
                }

                // Lưu accessToken vào context và localStorage
                setAccessToken(accessToken);
                setProfile(profile);
                setLoggedIn(true);

                // Chuyển hướng về trang chủ hoặc nơi phù hợp
                router.push("/");
            } catch (error) {
                console.error("Error during Google Login:", error);
                router.push("/auth/login"); // Redirect nếu có lỗi
            }
        };

        handleGoogleCallback();
    }, [router, setAccessToken, setLoggedIn, setProfile]);

    return <div>Processing Google Login...</div>;
};

export default GoogleCallback;

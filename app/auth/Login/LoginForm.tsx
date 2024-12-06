"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import authApiRequest from "@/app/apiRequests/auth";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import "./LoginGoogle.css";
import GoogleLogin from "./LoginGoogle";
import { jwtDecode } from "jwt-decode";
const formSchema = z.object({
    email: z.string().trim().min(1, { message: "Email là bắt buộc" }).email({ message: "Email không đúng định dạng" }),
    password: z.string().min(6, { message: "Mật khẩu ít nhất 6 kí tự" }),
});

export function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const { setLoggedIn, setProfile, setAccessToken } = useUser();
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (isLoading) return; // Prevent multiple submissions
        setLoading(true);
        try {
            const results = await authApiRequest.auth.login(values);
            console.log("Login API Response:", results);

            const accessToken = results.payload.result?.accessToken;
            const profileData = results.payload.result?.profile;

            if (!accessToken) throw new Error("AccessToken is missing!");
            setAccessToken(accessToken); // Gọi hàm từ UserContext

            if (!profileData) throw new Error("Profile is missing!");
            setProfile(profileData); // Gọi hàm từ UserContext
            console.log(profileData);

            // Decode Access Token để lấy role
            const decodedToken: { "X-User-Roles": string[] } = jwtDecode(accessToken);
            const roles = decodedToken["X-User-Roles"];

            if (!roles || roles.length === 0) {
                throw new Error("No roles found in token!");
            }

            toast({
                title: "SUCCESS",
                description: "Đăng nhập thành công",
                duration: 5000,
                variant: "default",
            });

            setLoggedIn(true);

            // Phân quyền dựa trên roles
            if (roles.length === 1 && roles.includes("USER")) {
                // Chỉ có role USER, điều hướng về trang chính
                router.push("/");
            } else {
                // Có thêm các role khác, điều hướng về trang admin kèm theo roles
                const rolesQuery = encodeURIComponent(roles.join(","));
                router.push(`/admin?roles=${rolesQuery}`);
            }
        } catch (error) {
            console.error(error);
            handleErrorApi({
                error,
                setError: form.setError,
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form} >
            <section className="flex flex-col ">
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 px-[12px] ">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email:</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu:</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Mật khẩu" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="bg-orange-500 hover:bg-orange-400" type="submit" disabled={isLoading}>
                        {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                    </Button>
                    <Link href='/auth/ForgetPass' className="ml-auto mr-auto text-slate-500">Quên mật khẩu</Link>

                </form>
                <GoogleLogin />
            </section>

        </Form>

    );
}

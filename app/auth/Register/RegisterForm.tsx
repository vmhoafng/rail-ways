"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import authApiRequest from "@/app/apiRequests/auth";
import { handleErrorApi } from "@/lib/utils";
import { RegisterBodyType } from "@/app/interfaces";


const formSchema = z.object({
    firstName: z.string().min(1, { message: "Họ là bắt buộc" }),
    lastName: z.string().min(1, { message: "Tên là bắt buộc" }),
    email: z
        .string()
        .trim()
        .min(1, { message: "Email là bắt buộc" })
        .email({ message: "Email không đúng định dạng" }),
    phone: z
        .string()
        .min(1, { message: "Số điện thoại là bắt buộc" })
        .regex(/^\d{10}$/, { message: "Số điện thoại phải có 10 số" }),
    password: z.string().min(6, { message: "Mật khẩu ít nhất 6 kí tự" }),
    confirmPassword: z.string()
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Mật khẩu không khớp",
            path: ['confirmPassword']
        });
    }
});;

export function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
        },
    });

    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (isLoading) return;
        setLoading(true);

        try {
            const registerBody: RegisterBodyType = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                password: values.password,
            };

            console.log("Register Request Body:", registerBody); // Log dữ liệu gửi đi

            const response = await authApiRequest.auth.register(registerBody);

            console.log("Register Success:", response); // Log phản hồi thành công

            toast({
                description: "Đăng ký thành công! Vui lòng kiểm tra email để xác thực.",
            });

            router.push(`/auth/VerifyToken?email=${response?.payload.result?.email}`);
        } catch (error) {
            console.error("Register Error:", error); // Log lỗi chi tiết
            handleErrorApi({
                error,
                setError: form.setError,
            });
        } finally {
            setLoading(false);
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 px-[12px]">
                <FormField control={form.control} name="firstName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Họ:</FormLabel>
                        <FormControl>
                            <Input placeholder="Họ" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="lastName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tên:</FormLabel>
                        <FormControl>
                            <Input placeholder="Tên" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email:</FormLabel>
                        <FormControl>
                            <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Số điện thoại:</FormLabel>
                        <FormControl>
                            <Input placeholder="Số điện thoại" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Mật khẩu:</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Mật khẩu" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Xác nhận Mật khẩu:</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Nhập lại mật khẩu" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button className="bg-orange-500 hover:bg-orange-400" type="submit">
                    Đăng ký
                </Button>
            </form>
        </Form>
    );
}

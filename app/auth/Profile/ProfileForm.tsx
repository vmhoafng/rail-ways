"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import authApiRequest from "@/app/apiRequests/auth";
import { useUser } from "@/contexts/UserContext";
import { clientAccessToken } from "@/lib/http";

// Zod schema for form validation
const profileSchema = z.object({
    email: z
        .string()
        .trim()
        .email({ message: "Email không đúng định dạng" }),
    firstName: z.string().min(1, { message: "Họ là bắt buộc" }),
    lastName: z.string().min(1, { message: "Tên là bắt buộc" }),
    phone: z
        .string()
        .regex(/^\d{10}$/, { message: "Số điện thoại phải có 10 số" }),
    oldPassword: z.string().min(6, { message: "Mật khẩu hiện tại là bắt buộc" }),
    password: z.string().min(6, { message: "Mật khẩu mới phải ít nhất 6 kí tự" }),
}).superRefine(({ oldPassword, password }, ctx) => {
    if (oldPassword === password) {
        ctx.addIssue({
            code: "custom",
            message: "Mật khẩu mới phải khác với mật khẩu cũ",
        });
    }
});

const ProfileForm = () => {
    const { profile, setProfile, accessToken } = useUser(); // Get user profile and updater
    const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
    // Initialize form with default values
    const { control, handleSubmit, reset } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            email: profile?.email || "",
            firstName: profile?.firstName || "",
            lastName: profile?.lastName || "",
            phone: profile?.phone || "",
            oldPassword: "",
            password: "",
        },
    });

    // Handle form submission
    const onSubmit = async (data: z.infer<typeof profileSchema>) => {
        console.log("Submitting data:", data);
        setIsSubmitting(true);
        try {
            if (!accessToken) throw new Error("AccessToken is missing!");
            const updateResponse = await authApiRequest.auth.updateProfile(data, accessToken);
            console.log("API response:", updateResponse);

            // Update profile in context and alert user
            setProfile(data);
            alert("Thông tin đã được cập nhật thành công!");
        } catch (error) {
            console.error("Cập nhật thất bại:", error);
            alert("Đã xảy ra lỗi khi cập nhật thông tin.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="container mx-auto mt-10 p-6">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-orange-500">Cập nhật thông tin cá nhân</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="email">Email:</Label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => <Input {...field} id="email" />}
                        />
                    </div>
                    <div>
                        <Label htmlFor="firstName">Họ:</Label>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => <Input {...field} id="firstName" />}
                        />
                    </div>
                    <div>
                        <Label htmlFor="lastName">Tên:</Label>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => <Input {...field} id="lastName" />}
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Số điện thoại:</Label>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => <Input {...field} id="phone" />}
                        />
                    </div>
                    <div>
                        <Label htmlFor="oldPassword">Mật khẩu hiện tại:</Label>
                        <Controller
                            name="oldPassword"
                            control={control}
                            render={({ field }) => <Input {...field} id="oldPassword" type="password" />}
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Mật khẩu mới:</Label>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => <Input {...field} id="password" type="password" />}
                        />
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => reset()} // Reset form values
                    disabled={isSubmitting}
                >
                    Hủy
                </Button>
                <Button
                    type="submit"
                    onClick={handleSubmit(onSubmit)} // Handle form submission
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Đang xử lý..." : "Cập nhật"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProfileForm;

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Train, AlertTriangle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
                <div className="text-center">
                    <Train className="mx-auto h-12 w-12 text-orange-500" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Oops! Không thể đi đến đây
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Có vẻ như địa chỉ bạn truy cập không tồn tại.
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="flex items-center justify-center space-x-2 text-yellow-600">
                        <AlertTriangle className="h-5 w-5" />
                        <span className="text-sm font-medium">
                            Lỗi 403: Bạn không có quyền truy cập trang này
                        </span>
                    </div>
                    <div className="text-sm text-center">
                        <p>
                            Đừng lo lắng! Hãy để chúng tôi đưa bạn trở lại đúng đường ray.
                        </p>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <Link href="/" passHref>
                            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                                Quay lại trang chủ
                            </Button>
                        </Link>
                        <Link href="/search" passHref>
                            <Button
                                variant="outline"
                                className="w-full border-orange-500 text-orange-500 hover:bg-orange-50">
                                Tìm kiếm chuyến tàu
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    Nếu bạn tin rằng đây là lỗi, vui lòng{" "}
                    <Link
                        href="/contact"
                        className="font-medium text-orange-600 hover:text-orange-500">
                        liên hệ với chúng tôi
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}

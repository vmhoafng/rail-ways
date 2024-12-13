"use client"
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'


export default function PaymentSuccessPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <div className="flex justify-center">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                    <CardTitle className="text-center mt-4">Thanh toán thành công</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-gray-600">
                        Cảm ơn bạn đã thanh toán. Giao dịch của bạn đã được xử lý thành công.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link href="/">
                        <Button>Quay lại trang chủ</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}


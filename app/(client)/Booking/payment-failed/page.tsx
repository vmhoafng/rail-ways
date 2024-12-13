import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function PaymentFailedPage() {
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <div className="flex justify-center">
                        <XCircle className="w-16 h-16 text-red-500" />
                    </div>
                    <CardTitle className="text-center mt-4">Thanh toán thất bại</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-gray-600">
                        Rất tiếc, giao dịch của bạn không thể hoàn tất. Vui lòng thử lại sau.
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


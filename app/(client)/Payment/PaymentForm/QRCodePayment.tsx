import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'

const QRCodePayment: React.FC = () => {
    return (
        <Card>
            <CardContent className="flex flex-col items-center p-6">
                <Image src="/placeholder.svg?height=200&width=200" alt="QR Code" width={200} height={200} />
                <p className="mt-4 text-sm text-center">Hướng dẫn thanh toán bằng FUTAPay</p>
                <ol className="list-decimal list-inside text-sm mt-2">
                    <li>Mở ứng dụng FUTAPay trên điện thoại</li>
                    <li>Dùng biểu tượng để quét mã QR</li>
                    <li>Quét mã và thanh toán</li>
                </ol>
            </CardContent>
        </Card>
    )
}

export default QRCodePayment
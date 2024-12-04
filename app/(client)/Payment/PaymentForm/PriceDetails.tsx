import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoCircledIcon } from '@radix-ui/react-icons'

interface PriceDetailsProps {
    ticketPrice: number
    paymentFee: number
}

const PriceDetails: React.FC<PriceDetailsProps> = ({ ticketPrice, paymentFee }) => {
    const total = ticketPrice + paymentFee

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    Chi tiết giá
                    <InfoCircledIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Giá vé lượt đi</span>
                        <span>{ticketPrice.toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Phí thanh toán</span>
                        <span>{paymentFee.toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Tổng tiền</span>
                        <span>{total.toLocaleString()}đ</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PriceDetails
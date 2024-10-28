import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TotalPaymentProps {
    amount: number
    timeLeft: number
}

const TotalPayment: React.FC<TotalPaymentProps> = ({ amount, timeLeft }) => {
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Tổng thanh toán</span>
                    <span className="text-2xl font-bold text-primary">{amount.toLocaleString()}đ</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Thời gian giữ chỗ còn lại: <span className="font-bold">{formatTime(timeLeft)}</span>
                </p>
            </CardContent>
        </Card>
    )
}

export default TotalPayment
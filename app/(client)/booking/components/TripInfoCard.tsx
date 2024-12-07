import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TripInfoCardProps {
    route: string
    departureTime: string
    seatCount: number
    dropOffPoint: string
    totalCost: number
}

const TripInfoCard: React.FC<TripInfoCardProps> = ({
    route,
    departureTime,
    seatCount,
    dropOffPoint,
    totalCost
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin lượt đi</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Tuyến xe</span>
                        <span>{route}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Thời gian xuất bến</span>
                        <span>{departureTime}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Số lượng ghế</span>
                        <span>{seatCount} Ghế</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Số ghế</span>
                        <span>{/* This will be filled dynamically */}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Điểm trả khách</span>
                        <span>{dropOffPoint}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Tổng tiền lượt đi</span>
                        <span>{totalCost}đ</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default TripInfoCard
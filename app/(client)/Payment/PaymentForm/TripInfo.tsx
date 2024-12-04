import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoCircledIcon } from '@radix-ui/react-icons'

interface TripInfoProps {
    route: string
    departureTime: string
    seatCount: number
    seatNumber: string
    pickupPoint: string
    pickupTime: string
    dropoffPoint: string
}

const TripInfo: React.FC<TripInfoProps> = ({
    route,
    departureTime,
    seatCount,
    seatNumber,
    pickupPoint,
    pickupTime,
    dropoffPoint
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    Thông tin lượt đi
                    <InfoCircledIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Tuyến xe:</span> {route}</p>
                    <p><span className="font-semibold">Thời gian xuất bến:</span> {departureTime}</p>
                    <p><span className="font-semibold">Số lượng ghế:</span> {seatCount} Ghế</p>
                    <p><span className="font-semibold">Số ghế:</span> {seatNumber}</p>
                    <p><span className="font-semibold">Điểm lên xe:</span> {pickupPoint}</p>
                    <p><span className="font-semibold">Thời gian lên xe:</span> {pickupTime}</p>
                    <p><span className="font-semibold">Điểm trả khách:</span> {dropoffPoint}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default TripInfo
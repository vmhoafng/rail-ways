'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SeatMap from './SeatMap'
import CustomerInfo from './CustomerInfo'
import TripInfo from './TripInfo'
import PriceSummary from './PriceSummary'
import TripInfoCard from './TripInfoCard'
import PriceDetailsCard from './PriceDetailsCard'


export default function BookingForm() {
    const [selectedSeat, setSelectedSeat] = useState<number | null>(null)
    const [customerInfo, setCustomerInfo] = useState({})
    const [price, setPrice] = useState(0)

    const handleSeatSelect = (seatNumber: number) => {
        setSelectedSeat(seatNumber)
        setPrice(150000) // Assuming a fixed price for simplicity
    }

    const handleInfoChange = (field: string, value: string) => {
        setCustomerInfo(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
        console.log('Booking submitted', { selectedSeat, customerInfo, price })
        // Implement submission logic here
    }

    return (
        <div className="container-custom grid grid-cols-3 gap-x-4 items-start content-start ">
            <div className='col-span-2 '>
                <Card className="">
                    <CardHeader>
                        <CardTitle>Đặt vé xe</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <SeatMap onSeatSelect={handleSeatSelect} />
                        <CustomerInfo onInfoChange={handleInfoChange} />
                        <TripInfo departure="Bến xe An Sương" arrival="Đà Lạt" />
                        <PriceSummary price={price} />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Hủy</Button>
                        <Button className='bg-orange-600 hover:bg-orange-500' onClick={handleSubmit}>Thanh toán</Button>
                    </CardFooter>
                </Card>

            </div>

            <div className="grid grid-cols-1 md:grid-rows-2 gap-6">
                <TripInfoCard
                    route="An Suong - Da Lat"
                    departureTime="00:02 01/11/2024"
                    seatCount={selectedSeat ? 1 : 0}
                    dropOffPoint="Đà Lạt"
                    totalCost={price}
                />
                <PriceDetailsCard
                    ticketPrice={price}
                    paymentFee={0}
                />
            </div>
        </div>
    )
}
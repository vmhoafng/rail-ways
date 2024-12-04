'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SeatMap from '../components/SeatMap'
import CustomerInfo from '../components/CustomerInfo'
import TripInfo from '../components/TripInfo'
import PriceSummary from '../components/PriceSummary'
import TripInfoCard from '../components/TripInfoCard'
import PriceDetailsCard from '../components/PriceDetailsCard'
import { cn } from "@/lib/utils"
import Link from 'next/link'


export default function BookingForm() {
    const [selectedSeat, setSelectedSeat] = useState<number | null>(null)
    const [customerInfo, setCustomerInfo] = useState({})
    const [price, setPrice] = useState(0)
    const [step, setStep] = useState(1)
    const [selectedSeats, setSelectedSeats] = useState<string[]>([])

    const handleSeatSelect = (seatNumber: number) => {
        setSelectedSeat(seatNumber)
        setPrice(150000)
    }

    const handleInfoChange = (field: string, value: string) => {
        setCustomerInfo(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
        console.log('Booking submitted', { selectedSeat, customerInfo, price })
    }

    const steps = [
        { id: 1, title: "CHỌN GHẾ" },
        { id: 2, title: "THÔNG TIN KHÁCH HÀNG" },
        { id: 3, title: "ĐIỂM ĐÓN/TRẢ" },
        { id: 4, title: "THANH TOÁN" }
    ]



    return (
        <>
            {/* Desktop View */}
            <div className="hidden md:grid md:container-custom grid-cols-3 gap-x-4 items-start content-start">
                <div className='col-span-2'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Đặt vé xe</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <SeatMap onSeatSelect={handleSeatSelect} />
                            <CustomerInfo onInfoChange={handleInfoChange} />
                            <TripInfo departure="Sài Gòn" arrival="Hà Nội" />
                            <PriceSummary price={price} />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Hủy</Button>
                            <Button className='bg-orange-600 hover:bg-orange-500' onClick={handleSubmit}>
                                <Link href="/Payment">Thanh Toán</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="grid grid-cols-1 grid-rows-2 gap-6">
                    <TripInfoCard
                        route="Sai Gon - Ha Noi"
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

            {/* Mobile View */}
            <div className="md:hidden min-h-screen bg-gray-50">
                {/* Fixed Header */}
                <div className=" bg-white z-10">
                    <div className="flex items-center justify-between px-4 py-2 text-xs border-b">
                        {steps.map((s, i) => (
                            <div
                                key={s.id}
                                className={cn(
                                    "flex items-center",
                                    step === s.id ? "text-primary" : "text-gray-400"
                                )}
                            >
                                <div className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center border",
                                    step === s.id ? "border-primary text-primary" : "border-gray-300"
                                )}>
                                    {s.id}
                                </div>
                                <span className="ml-1 hidden sm:inline">{s.title}</span>
                                {i < steps.length - 1 && (
                                    <div className="w-8 h-px bg-gray-300 mx-2" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Content */}
                <div className="pt-28 px-4 pb-24">
                    <div className="space-y-6">
                        <SeatMap onSeatSelect={handleSeatSelect} />
                    </div>
                </div>

                {/* Mobile Bottom Bar */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Vé chiều đi ({selectedSeats.length})</span>
                        <span className="text-sm font-medium">
                            {price.toLocaleString('vi-VN')}đ
                        </span>
                    </div>
                    <Button
                        className="w-full bg-orange-600 hover:bg-orange-500"
                        size="lg"
                        onClick={() => setStep(prev => Math.min(prev + 1, 4))}
                    >
                        Mua vé
                    </Button>
                </div>
            </div>
        </>
    )
}
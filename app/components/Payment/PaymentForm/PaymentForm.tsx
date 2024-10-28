'use client'
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import PaymentMethodSelector from './PaymentMethodSelector'
import TotalPayment from './TotalPayment'
import QRCodePayment from './QRCodePayment'
import CustomerInfo from './CustomerInfo'
import TripInfo from './TripInfo'
import PriceDetails from './PriceDetails'

const paymentMethods = [
    { id: 'momo', name: 'MoMo', logo: '/placeholder.svg?height=24&width=24' },
    { id: 'atm', name: 'Thẻ ATM nội địa', logo: '/placeholder.svg?height=24&width=24' },
    { id: 'visa', name: 'Thẻ Visa/Master/JCB', logo: '/placeholder.svg?height=24&width=24' },
]

export default function PaymentForm() {
    const [selectedPayment, setSelectedPayment] = useState('futapay')
    const [timeLeft, setTimeLeft] = useState(1199) // 19:59 in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="container-custom mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Chọn phương thức thanh toán</h1>

            <div className="grid md:grid-cols-3 gap-6">
                <PaymentMethodSelector
                    paymentMethods={paymentMethods}
                    selectedPayment={selectedPayment}
                    onPaymentChange={setSelectedPayment}
                />

                <div className="space-y-6">
                    <TotalPayment amount={290000} timeLeft={timeLeft} />

                    {selectedPayment === 'futapay' && <QRCodePayment />}
                </div>
                <div className='flex flex-col gap-5'>
                    <CustomerInfo
                        name="Lê Việt Chương"
                        phone="0357352570"
                        email="chuonglever@gmail.com"
                    />

                    <TripInfo
                        route="An Suong - Da Lat"
                        departureTime="00:02 01/11/2024"
                        seatCount={1}
                        seatNumber="B09"
                        pickupPoint="Bến xe An Sương"
                        pickupTime="Trước 23:47 31/10/2024"
                        dropoffPoint="Đà Lạt"
                    />

                    <PriceDetails ticketPrice={290000} paymentFee={0} />
                </div>
            </div>
            <div className="flex justify-end space-x-4">
                <Button variant="outline">Hủy</Button>
                <Button>Thanh toán</Button>
            </div>

        </div>
    )
}
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
    { id: 'momo', name: 'MoMo', logo: 'https://storage.googleapis.com/futa-busline-web-cms-prod/momo_bb732ac6f7/momo_bb732ac6f7.svg' },
    { id: 'atm', name: 'Thẻ ATM nội địa', logo: 'https://storage.googleapis.com/futa-busline-web-cms-prod/Logo_Shopee_Pay_2024_1fb07ef622/Logo_Shopee_Pay_2024_1fb07ef622.png' },
    { id: 'visa', name: 'Thẻ Visa/Master/JCB', logo: 'https://storage.googleapis.com/futa-busline-web-cms-prod/visa_logo_3d2a20b162/visa_logo_3d2a20b162.png' },
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
                <Button className='bg-orange-600 hover:bg-orange-500'>Thanh toán</Button>
            </div>

        </div>
    )
}
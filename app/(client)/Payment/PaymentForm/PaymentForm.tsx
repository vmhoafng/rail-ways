'use client'
import React, { useState, useEffect, use } from 'react'
import { Button } from "@/components/ui/button"
import PaymentMethodSelector from './PaymentMethodSelector'
import TotalPayment from './TotalPayment'
import CustomerInfo from './CustomerInfo'
import TripInfo from './TripInfo'
import PriceDetails from './PriceDetails'
import { useRouter } from 'next/navigation'

const paymentMethods = [
    { id: 'momo', name: 'MoMo', logo: 'https://storage.googleapis.com/futa-busline-web-cms-prod/momo_bb732ac6f7/momo_bb732ac6f7.svg' },
    { id: 'atm', name: 'Thẻ ATM nội địa', logo: 'https://storage.googleapis.com/futa-busline-web-cms-prod/Logo_Shopee_Pay_2024_1fb07ef622/Logo_Shopee_Pay_2024_1fb07ef622.png' },
    { id: 'visa', name: 'Thẻ Visa/Master/JCB', logo: 'https://storage.googleapis.com/futa-busline-web-cms-prod/visa_logo_3d2a20b162/visa_logo_3d2a20b162.png' },
]

export default function PaymentForm() {
    const [selectedPayment, setSelectedPayment] = useState('futapay')
    const [timeLeft, setTimeLeft] = useState(1199) // 19:59 in seconds
    const router = useRouter()
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
        }, 1000)
        return () => clearInterval(timer)
    }, [])
    const handlePayment = async () => {
        router.push('/Booking/verify-token?sdfsfd')
    }

    return (
        <div className=" p-1 space-y-2 flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold ">Chọn phương thức thanh toán</h1>
            <PaymentMethodSelector
                paymentMethods={paymentMethods}
                selectedPayment={selectedPayment}
                onPaymentChange={setSelectedPayment}
            />

            <div className="">
                <TotalPayment amount={290000} timeLeft={timeLeft} />

            </div>
            <div className="flex justify-end space-x-4">
                <Button variant="outline">Hủy</Button>
                <Button onClick={handlePayment} className='bg-orange-600 hover:bg-orange-500'>Thanh toán</Button>
            </div>

        </div>
    )
}
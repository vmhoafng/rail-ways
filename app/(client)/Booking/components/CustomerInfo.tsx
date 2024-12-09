import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { InputOTPPattern } from '@/components/ui/custominput'
import { Button } from '@/components/ui/button'


interface CustomerInfoProps {
    onInfoChange: (field: string, value: string) => void
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ onInfoChange }) => {
    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="name">Họ và tên *</Label>
                <Input id="name" placeholder="Nhập họ và tên" onChange={(e) => onInfoChange('name', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input id="phone" placeholder="Nhập số điện thoại" onChange={(e) => onInfoChange('phone', e.target.value)} />
            </div>
            <div className='flex items-start gap-4 flex-col'>

                <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" placeholder="Nhập email" onChange={(e) => onInfoChange('email', e.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default CustomerInfo
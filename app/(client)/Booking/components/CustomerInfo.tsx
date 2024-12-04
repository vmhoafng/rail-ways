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
                <Input id="name" placeholder="Lê Việt Chương" onChange={(e) => onInfoChange('name', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input id="phone" placeholder="0357342570" onChange={(e) => onInfoChange('phone', e.target.value)} />
            </div>
            <div className='flex items-start gap-4 flex-col'>

                <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" placeholder="chuonglever@gmail.com" onChange={(e) => onInfoChange('email', e.target.value)} />
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                    Chấp nhận điều khoản đặt vé và lưu thông tin cho lần đặt vé sau
                </label>
            </div>
        </div>
    )
}

export default CustomerInfo
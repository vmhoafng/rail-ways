import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CustomerInfoProps {
    name: string
    phone: string
    email: string
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ name, phone, email }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Thông tin hành khách</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p><span className="font-semibold">Họ và tên:</span> {name}</p>
                    <p><span className="font-semibold">Số điện thoại:</span> {phone}</p>
                    <p><span className="font-semibold">Email:</span> {email}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default CustomerInfo
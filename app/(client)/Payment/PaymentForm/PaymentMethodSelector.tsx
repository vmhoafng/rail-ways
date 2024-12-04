import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from 'next/image'

interface PaymentMethod {
    id: string
    name: string
    logo: string
    description?: string
}

interface PaymentMethodSelectorProps {
    paymentMethods: PaymentMethod[]
    selectedPayment: string
    onPaymentChange: (value: string) => void
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
    paymentMethods,
    selectedPayment,
    onPaymentChange
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Phương thức thanh toán</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup value={selectedPayment} onValueChange={onPaymentChange}>
                    {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center space-x-2 mb-2">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Label htmlFor={method.id} className="flex items-center">
                                <Image src={method.logo} alt={method.name} width={24} height={24} className="mr-2" />
                                {method.name}
                            </Label>
                            {method.description && (
                                <span className="text-xs text-muted-foreground ml-2">{method.description}</span>
                            )}
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    )
}

export default PaymentMethodSelector
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard, Wallet, DollarSign } from 'lucide-react'

type PaymentMethod = 'momo' | 'paypal' | 'direct'

interface PaymentMethodSelectorProps {
    onSelect: (method: PaymentMethod) => void
}

export function PaymentMethodSelector({ onSelect }: PaymentMethodSelectorProps) {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('momo')

    const handleSelect = (value: PaymentMethod) => {
        setSelectedMethod(value)
        onSelect(value)
    }

    return (
        <RadioGroup defaultValue="momo" className="grid grid-cols-3 gap-4">
            <div>
                <RadioGroupItem value="momo" id="momo" className="peer sr-only" onClick={() => handleSelect('momo')} />
                <Label
                    htmlFor="momo"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <Wallet className="mb-3 h-6 w-6" />
                    MoMo
                </Label>
            </div>
            <div>
                <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" onClick={() => handleSelect('paypal')} />
                <Label
                    htmlFor="paypal"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <CreditCard className="mb-3 h-6 w-6" />
                    PayPal
                </Label>
            </div>
            <div>
                <RadioGroupItem value="direct" id="direct" className="peer sr-only" onClick={() => handleSelect('direct')} />
                <Label
                    htmlFor="direct"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <DollarSign className="mb-3 h-6 w-6" />
                    Direct
                </Label>
            </div>
        </RadioGroup>
    )
}


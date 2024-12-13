import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard, Wallet, DollarSign } from 'lucide-react'

type PaymentMethod = 'MOMO' | 'PAYPAL' | 'COD'

interface PaymentMethodSelectorProps {
    onSelect: (method: PaymentMethod) => void
}

export function PaymentMethodSelector({ onSelect }: PaymentMethodSelectorProps) {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('MOMO')

    const handleSelect = (value: PaymentMethod) => {
        setSelectedMethod(value)
        onSelect(value)
    }

    return (
        <RadioGroup defaultValue="MOMO" className="grid grid-cols-3 gap-4">
            <div>
                <RadioGroupItem value="MOMO" id="MOMO" className="peer sr-only" onClick={() => handleSelect('MOMO')} />
                <Label
                    htmlFor="MOMO"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <Wallet className="mb-3 h-6 w-6" />
                    MOMO
                </Label>
            </div>
            <div>
                <RadioGroupItem value="PAYPAL" id="PAYPAL" className="peer sr-only" onClick={() => handleSelect('PAYPAL')} />
                <Label
                    htmlFor="PAYPAL"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <CreditCard className="mb-3 h-6 w-6" />
                    PAYPAL
                </Label>
            </div>
            <div>
                <RadioGroupItem value="COD" id="COD" className="peer sr-only" onClick={() => handleSelect('COD')} />
                <Label
                    htmlFor="COD"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <DollarSign className="mb-3 h-6 w-6" />
                    COD
                </Label>
            </div>
        </RadioGroup>
    )
}


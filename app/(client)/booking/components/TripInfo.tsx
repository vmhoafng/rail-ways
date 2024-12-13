import React from 'react'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TripInfoProps {
    departure: string
    arrival: string
}

const TripInfo: React.FC<TripInfoProps> = ({ departure, arrival }) => {
    return (
        <div className="space-y-4">
            <div>
                <Label>Ga đi</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder={departure} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={departure}>{departure}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Ga đến</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder={arrival} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={arrival}>{arrival}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default TripInfo
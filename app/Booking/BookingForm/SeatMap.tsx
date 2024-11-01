import React from 'react'
import TrainCarSelection from '@/app/components/Seats'

interface SeatMapProps {
    onSeatSelect: (seatNumber: number) => void
}

const SeatMap: React.FC<SeatMapProps> = ({ onSeatSelect }) => {
    return (
        <TrainCarSelection />
    )
}

export default SeatMap
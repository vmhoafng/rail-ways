import React from 'react'

interface SeatMapProps {
    onSeatSelect: (seatNumber: number) => void
}

const SeatMap: React.FC<SeatMapProps> = ({ onSeatSelect }) => {
    return (
        <div className="grid grid-cols-6 gap-2 p-4 bg-gray-100 rounded-lg">
            {[...Array(36)].map((_, index) => (
                <button
                    key={index}
                    className="w-8 h-8 bg-white border border-gray-300 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => onSeatSelect(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    )
}

export default SeatMap
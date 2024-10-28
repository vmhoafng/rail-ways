import { useState } from 'react'

type DateSelectorProps = {
    selectedDate: Date
    onDateChange: (date: Date) => void
}

export default function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date())

    // Implement calendar logic here

    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Chọn ghế</h2>
            {/* Implement calendar UI here */}
        </div>
    )
}
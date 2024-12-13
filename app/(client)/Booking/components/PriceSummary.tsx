import React from 'react'

interface PriceSummaryProps {
    price: number
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ price }) => {
    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <span>Giá vé tàu</span>
                <span>{price} đ</span>
            </div>
            <div className="flex justify-between font-bold">
                <span>Tổng tiền</span>
                <span>{price} đ</span>
            </div>
        </div>
    )
}

export default PriceSummary
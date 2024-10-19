import { Button } from './Button'

interface TrainOptionProps {
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  trainType: string
}

export function TrainOption({ departureTime, arrivalTime, duration, price, trainType }: TrainOptionProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <div className="text-lg font-semibold">{departureTime} - {arrivalTime}</div>
        <div className="text-sm text-gray-600">{duration}</div>
        <div className="text-sm text-gray-600">{trainType}</div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold">US$ {price.toFixed(2)}</div>
        <Button className="mt-2">Chọn</Button>
      </div>
    </div>
  )
}
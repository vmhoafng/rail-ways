import { Button } from './Button'

export function PromoCodeInput() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">Loại ưu đãi</h3>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Nhập mã ưu đãi"
          className="flex-grow p-2 border border-gray-300 rounded-md"
        />
        <Button>Áp dụng</Button>
      </div>
    </div>
  )
}
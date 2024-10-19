import { CountrySelect } from './CountrySelect'

export function PassengerInfo() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">Thông tin liên lạc:</h3>
      <div className="space-y-4">
        <CountrySelect />
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại (liên hệ khẩn cấp)</label>
          <input
            type="tel"
            id="phone"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Số điện thoại"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (nhận voucher)</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Email"
          />
        </div>
      </div>
    </div>
  )
}
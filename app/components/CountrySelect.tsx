export function CountrySelect() {
    return (
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
          Quốc gia/Khu vực trên hộ chiếu
        </label>
        <select
          id="country"
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Chọn quốc gia</option>
          <option value="VN">Việt Nam</option>
          <option value="JP">Nhật Bản</option>
          <option value="US">Hoa Kỳ</option>
          {/* Add more countries as needed */}
        </select>
      </div>
    )
  }
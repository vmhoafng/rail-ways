export function PaymentSummary() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Tổng cộng</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Shinagawa - Shin-Osaka</span>
            <span>US$ 97.40</span>
          </div>
          <div className="flex justify-between">
            <span>Phí dịch vụ đơn hàng</span>
            <span>US$ 12.69</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mt-4">
            
            <span>Tổng cộng</span>
            <span>US$ 110.09</span>
          </div>
        </div>
      </div>
    )
  }
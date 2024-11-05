import React from "react";
import { Phone, Mail, MapPin, Building } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-blue-600 mb-8">
        Thông tin liên hệ
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Company Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-orange-500">
            Tổng công ty Đường sắt Việt Nam
          </h2>

          <div className="space-y-2 text-gray-600">
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
              <p>Số 118 Lê Duẩn, Hoàn Kiếm, Hà Nội.</p>
            </div>

            <div className="flex items-start gap-2">
              <Building className="w-5 h-5 mt-1 flex-shrink-0" />
              <p className="text-sm">
                Giấy chứng nhận ĐKKD số 113642 theo QĐ thành lập số 973/QĐ-TTg
                ngày 25/06/2010 của Thủ tướng Chính phủ.
              </p>
            </div>

            <div className="flex items-start gap-2">
              <Building className="w-5 h-5 mt-1 flex-shrink-0" />
              <p className="text-sm">
                Mã số doanh nghiệp: 0100105052, đăng ký lần đầu ngày 26/07/2010,
                đăng ký thay đổi lần 4 ngày 27/06/2014 tại Sở KHĐT Thành phố Hà
                Nội.
              </p>
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-orange-500">
              Tổng đài hỗ trợ và chăm sóc khách hàng
            </h2>
            <p className="text-sm text-gray-600">
              Hỗ trợ tra cứu giờ tàu, giá vé, quy định đổi và trả vé, các chương
              trình khuyến mại, mua vé qua số điện thoại
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                <span className="font-medium">Khu vực miền Bắc:</span>
                <span className="text-green-600 font-semibold">1900 0109</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                <span className="font-medium">Khu vực miền Nam:</span>
                <span className="text-green-600 font-semibold">1900 1520</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-orange-500">
              Tổng đài hỗ trợ thanh toán và hoàn tiền online
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                <span className="font-medium">Điện thoại:</span>
                <span className="text-green-600 font-semibold">1900 6469</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-600" />
                <span className="font-medium">Email:</span>
                <a
                  href="mailto:support1@dsvn.vn"
                  className="text-green-600 hover:underline">
                  support1@dsvn.vn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

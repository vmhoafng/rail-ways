'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Train, MapPin, CreditCard, User, Mail } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import ticketApiRequest from "@/app/apiRequests/ticket";

interface Ticket {
  departureStationName: string;
  arrivalStationName: string;
  departureTime: string;
  seatNumber: string[];
  price: number;
  trainName?: string;
  customerName: string;
  customerEmail: string;
}

export default function BookedTicketPage() {
  const { profile, accessToken } = useUser(); // Lấy thông tin user từ context
  const [ticketData, setTicketData] = useState<Ticket[] | null>(null); // State để lưu danh sách vé
  const [loading, setLoading] = useState<boolean>(true); // State để xử lý trạng thái loading
  const [error, setError] = useState<string | null>(null); // State để lưu lỗi

  useEffect(() => {
    const fetchTickets = async () => {
      if (profile?.email && accessToken) {
        try {
          const data: Ticket[] = await ticketApiRequest.ticket.getTicketByEmail(profile.email, accessToken);
          setTicketData(data);
        } catch (err) {
          console.error("Error fetching ticket data:", err);
          setError("Không thể tải thông tin vé. Vui lòng thử lại sau.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("Không tìm thấy thông tin người dùng.");
        setLoading(false);
      }
    };

    fetchTickets();
  }, [profile?.email, accessToken]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (loading) {
    return <div className="container mx-auto p-4 max-w-2xl">Đang tải thông tin vé...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 max-w-2xl text-red-500">{error}</div>;
  }

  if (!ticketData || ticketData.length === 0) {
    return <div className="container mx-auto p-4 max-w-2xl">Không có thông tin vé nào.</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Thông tin vé đã đặt</h1>

      {ticketData.map((ticket: Ticket, index: number) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Train className="h-5 w-5" />
              Vé tàu {ticket.trainName || "Chưa xác định"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Thông tin chuyến đi */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 mt-1 text-gray-500" />
                <div className="flex-1">
                  <p className="font-medium">Ga đi - Ga đến</p>
                  <p className="text-gray-600">
                    {ticket.departureStationName} - {ticket.arrivalStationName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CalendarDays className="h-5 w-5 mt-1 text-gray-500" />
                <div className="flex-1">
                  <p className="font-medium">Thời gian khởi hành</p>
                  <p className="text-gray-600">{formatDate(ticket.departureTime)}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CreditCard className="h-5 w-5 mt-1 text-gray-500" />
                <div className="flex-1">
                  <p className="font-medium">Giá vé</p>
                  <p className="text-gray-600">{formatPrice(ticket.price)}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="font-medium mb-2">Số ghế</p>
              <div className="flex gap-2 flex-wrap">
                {ticket.seatNumber.map((seat: string) => (
                  <Badge key={seat} variant="secondary">
                    {seat}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Thông tin hành khách */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex items-start gap-4">
                <User className="h-5 w-5 mt-1 text-gray-500" />
                <div className="flex-1">
                  <p className="font-medium">Tên hành khách</p>
                  <p className="text-gray-600">{ticket.customerName}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 mt-1 text-gray-500" />
                <div className="flex-1">
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{ticket.customerEmail}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

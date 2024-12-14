'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ticketApiRequest from '@/app/apiRequests/ticket';

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
    const [ticketCode, setTicketCode] = useState('');
    const [tickets, setTickets] = useState<Ticket[] | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const searchTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setTickets(null);
        setLoading(true);

        try {
            const response = await ticketApiRequest.ticket.getTicketByOrderNumber(ticketCode);
            if (response.length > 0) {
                setTickets(response);
            } else {
                setError('Không tìm thấy vé với mã đã nhập.');
            }
        } catch (err) {
            console.error('Error fetching ticket:', err);
            setError('Đã xảy ra lỗi, vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-custom mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Tìm kiếm vé đã đặt</h1>

            <form onSubmit={searchTicket} className="flex gap-2 mb-4">
                <Input
                    type="text"
                    placeholder="Nhập mã vé"
                    value={ticketCode}
                    onChange={(e) => setTicketCode(e.target.value)}
                    className="flex-grow"
                />
                <Button type="submit" disabled={loading}>
                    <Search className="mr-2 h-4 w-4" /> Tìm kiếm
                </Button>
            </form>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {tickets && tickets.length > 0 && (
                <div>
                    {tickets.map((ticket, index) => (
                        <Card key={index} className="mb-4">
                            <CardHeader>
                                <CardTitle>Thông tin vé</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><strong>Ga đi:</strong> {ticket.departureStationName}</p>
                                <p><strong>Ga đến:</strong> {ticket.arrivalStationName}</p>
                                <p><strong>Thời gian khởi hành:</strong> {new Date(ticket.departureTime).toLocaleString('vi-VN')}</p>
                                <p><strong>Số ghế:</strong> {ticket.seatNumber.join(', ')}</p>
                                <p><strong>Giá vé:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ticket.price)}</p>
                                <p><strong>Tên hành khách:</strong> {ticket.customerName}</p>
                                <p><strong>Email:</strong> {ticket.customerEmail}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {loading && <p className="text-blue-500">Đang tìm kiếm...</p>}
        </div>
    );
}
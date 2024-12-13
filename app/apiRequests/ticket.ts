import http from "@/lib/http";

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

const ticketApiRequest = {
  ticket: {
    async getTicketByEmail(email: string, token: string): Promise<Ticket[]> {
      try {
        const response = await http.get<{ result: Ticket[] }>(
          `/api/v1/ticket/anonymous/get-by-email?email=${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.payload.result; // Trả về danh sách vé từ API
      } catch (error) {
        console.error("Error in getTicketByEmail:", error);
        throw error;
      }
    },

    async getTicketByOrderNumber(orderNumber: string): Promise<Ticket[]> {
      try {
        const response = await http.get<{ result: Ticket[] }>(
          `/api/v1/ticket/anonymous/get-by-order-number?orderNumber=${orderNumber}`
        );
        return response.payload.result; // Trả về danh sách vé từ API
      } catch (error) {
        console.error("Error in getTicketByOrderNumber:", error);
        throw error;
      }
    },
  },
};

export default ticketApiRequest;

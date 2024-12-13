export interface ChatbotBodyType {
  message: string;
}

export interface ChatbotResponse {
  message: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "";

// Chatbot API request
const chatbotApiRequest = {
  getChatbotData: async (body: ChatbotBodyType): Promise<ChatbotResponse> => {
    const response = await fetch(`${BASE_URL}/api/v1/store/anonymous/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // Đọc nội dung lỗi từ API nếu trả về text
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch chatbot response.");
    }

    // Đọc nội dung phản hồi từ API dưới dạng text
    const textResponse = await response.text();
    return { message: textResponse };
  },
};

export default chatbotApiRequest;

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
interface AccordionProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}
export default function TrainTravelFAQ({ className }: AccordionProps) {
  const faqItems = [
    {
      question:
        "Tôi có cần đặt chỗ để hành lý quá khổ trên tàu Shinkansen không?",
      answer:
        "Có, bạn cần đặt chỗ cho hành lý quá khổ trên tàu Shinkansen. Hành lý có kích thước tổng cộng (chiều dài + chiều rộng + chiều cao) vượt quá 160cm hoặc nặng hơn 30kg được coi là quá khổ. Bạn cần đặt trước khu vực hành lý đặc biệt khi mua vé.",
    },
    {
      question:
        "Tôi có hành lý quá khổ. Làm thế nào để tôi đặt chỗ hành lý trên tàu?",
      answer:
        "Để đặt chỗ cho hành lý quá khổ, bạn cần thông báo khi mua vé. Tại quầy vé hoặc máy bán vé tự động, hãy chọn tùy chọn đặt chỗ hành lý đặc biệt. Có thể có phụ phí cho dịch vụ này. Đảm bảo đặt trước vì số lượng chỗ cho hành lý quá khổ có hạn.",
    },
    {
      question: "Làm cách nào để nhận vé tàu JR?",
      answer:
        "Bạn có thể nhận vé tàu JR qua nhiều cách:\n1. Tại quầy vé JR ở bất kỳ ga JR nào\n2. Tại máy bán vé tự động JR\n3. Tại các đại lý du lịch được ủy quyền\n4. Đối với vé đặt trước trực tuyến, bạn có thể nhận tại quầy vé hoặc máy tự động bằng mã đặt chỗ của mình",
    },
    {
      question: "Làm cách nào để hủy hoặc thay đổi vé tàu JR của tôi?",
      answer:
        "Để hủy hoặc thay đổi vé tàu JR:\n1. Đến quầy vé JR tại bất kỳ ga JR nào\n2. Xuất trình vé và yêu cầu hủy hoặc thay đổi\n3. Đối với hủy vé, có thể áp dụng phí hủy tùy thuộc vào thời gian trước khi khởi hành\n4. Đối với thay đổi, bạn có thể phải trả thêm tiền nếu vé mới đắt hơn\nLưu ý rằng một số loại vé có thể không được hoàn tiền hoặc thay đổi",
    },
    {
      question:
        "Sự khác biệt giữa toa tàu xanh Shinkansen và toa thông thường là gì?",
      answer:
        "Toa xanh (Green Car) là khoang hạng nhất của Shinkansen, khác với toa thông thường ở các điểm sau:\n1. Ghế rộng và thoải mái hơn\n2. Không gian để chân lớn hơn\n3. Số lượng ghế ít hơn, mang lại không gian yên tĩnh hơn\n4. Dịch vụ đặc biệt như khăn lạnh miễn phí\n5. Ổ cắm điện tại mỗi ghế\n6. Giá vé cao hơn so với toa thông thường",
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Câu hỏi thường gặp</h2>
      <Accordion
        type="single"
        collapsible
        className={`w-full border bg-white border-gray-300 rounded-lg ${className}`}>
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left gap-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="whitespace-pre-line">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

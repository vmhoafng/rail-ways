'use client'
import { useState } from 'react'

const faqs = [
  {
    question: 'Làm cách nào để nhận vé tàu JR?',
    answer: 'Bạn có thể nhận vé tàu JR tại quầy vé hoặc máy bán vé tự động tại các ga JR. Hãy đảm bảo mang theo mã đặt vé và giấy tờ tùy thân.'
  },
  {
    question: 'Tôi có cần đặt chỗ để hành quá khứ trên tàu Shinkansen không?',
    answer: 'Có, bạn nên đặt chỗ trước cho tàu Shinkansen, đặc biệt là trong mùa cao điểm. Tuy nhiên, một số toa không cần đặt chỗ trước.'
  },
  {
    question: 'Nếu tôi lỡ chuyến tàu đã đặt thì sao?',
    answer: 'Nếu bạn lỡ chuyến tàu đã đặt, hãy liên hệ với nhân viên ga càng sớm càng tốt. Trong nhiều trường hợp, bạn có thể đổi vé sang chuyến tàu tiếp theo mà không mất phí.'
  }
]

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border rounded-lg">
          <button
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="font-medium">{faq.question}</span>
            <span>{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && (
            <div className="p-4 bg-gray-50">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
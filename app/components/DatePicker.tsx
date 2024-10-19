export function DatePicker() {
    const dates = ['19/10', '20/10', '21/10', '22/10', '23/10', '24/10', '25/10']
    const days = ['Thứ 7', 'Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6']
  
    return (
      <div className="flex space-x-2 overflow-x-auto py-4">
        {dates.map((date, index) => (
          <button
            key={date}
            className={`flex-shrink-0 p-2 rounded-lg ${
              index === 3 ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            <div className="text-sm">{days[index]}</div>
            <div className="font-semibold">{date}</div>
          </button>
        ))}
      </div>
    )
  }
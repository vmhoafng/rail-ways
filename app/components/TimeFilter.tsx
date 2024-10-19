export function TimeFilter() {
    const timeRanges = [
      '00:00-08:59',
      '09:00-11:59',
      '12:00-16:59',
      '17:00-23:59'
    ]
  
    return (
      <div className="flex space-x-2 overflow-x-auto py-4">
        {timeRanges.map((range) => (
          <button
            key={range}
            className="flex-shrink-0 px-4 py-2 rounded-full border border-gray-300 text-sm"
          >
            {range}
          </button>
        ))}
      </div>
    )
  }
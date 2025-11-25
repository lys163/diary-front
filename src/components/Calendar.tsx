import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  currentDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
  diaryEntries: Record<string, { title: string; mood: string; content: string }>;
}

export function Calendar({ currentDate, selectedDate, onDateSelect, onMonthChange, diaryEntries }: CalendarProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 해당 월의 첫날과 마지막 날
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // 달력 시작 요일 (0 = 일요일)
  const startDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // 이전 달로 이동
  const prevMonth = () => {
    onMonthChange(new Date(year, month - 1, 1));
  };

  // 다음 달로 이동
  const nextMonth = () => {
    onMonthChange(new Date(year, month + 1, 1));
  };

  // 날짜 배열 생성
  const days = [];
  
  // 빈 칸 추가 (이전 달의 날짜들)
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }
  
  // 현재 달의 날짜들 추가
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
  };

  const handleDateClick = (day: number) => {
    const date = new Date(year, month, day);
    onDateSelect(date);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/20">
      {/* 월 선택 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-orange-700" />
        </button>
        
        <h3 className="text-orange-950">
          {year}년 {month + 1}월
        </h3>
        
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-orange-700" />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={`text-center py-2 ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-orange-800'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const date = new Date(year, month, day);
          const dateKey = formatDateKey(date);
          const hasEntry = diaryEntries[dateKey];
          const dayOfWeek = date.getDay();

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`
                aspect-square rounded-xl p-2 transition-all duration-200
                flex flex-col items-center justify-center
                ${isSelected(day) 
                  ? 'bg-gradient-to-br from-orange-400 to-rose-500 text-white shadow-lg scale-105' 
                  : isToday(day)
                  ? 'bg-orange-100 text-orange-900 ring-2 ring-orange-400'
                  : 'bg-orange-50/50 text-orange-900 hover:bg-orange-100'
                }
                ${dayOfWeek === 0 && !isSelected(day) ? 'text-red-500' : ''}
                ${dayOfWeek === 6 && !isSelected(day) ? 'text-blue-500' : ''}
              `}
            >
              <span className={`${hasEntry ? 'font-bold' : ''}`}>{day}</span>
              {hasEntry && (
                <div className="w-1.5 h-1.5 rounded-full bg-current mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

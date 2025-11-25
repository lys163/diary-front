import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, use } from 'react';
import diaryApi from '../api/diaryApiAxios';

interface CalendarProps {
  currentDate: Date;
  selectedDate: Date | null;
  //수정 onDateSelect: (date: Date) => void;
  onDateSelect: (date: Date, data: any) => void;
  onMonthChange: (date: Date) => void;
  diaryEntries: Record<string, { title: string; mood: string; content: string }>;
}



export function Calendar({ currentDate, selectedDate, onDateSelect, onMonthChange, diaryEntries }: CalendarProps) {

  const [data, setData] = useState(null);
  const [diarydata, setDiarydata] = useState(null);
  
  useEffect(() => {
    diaryApi.getCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1).then((data) => {
      setData(data);
    });
  }, []);

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
    // diaryApi.getCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1, localStorage.getItem('token')).then((data) => {
    //   console.log('prevMonth : 달력 데이터:', data);
    // });
    onMonthChange(new Date(year, month - 1, 1));
  };

  // 다음 달로 이동
  const nextMonth = () => {
    // diaryApi.getCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1, localStorage.getItem('token')).then((data) => {
    //   console.log('nextMonth : 달력 데이터:', data);
    // });
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
  //수정 const handleDateClick = (day: number) => {
  // const handleDateClick = (day: number,data: any) => {
  //   console.log('Clicked day:', day);
  //   const date = new Date(year, month, day);
  //   //수정 onDateSelect(date);
  //   console.log("data???????",data);
  //   console.log(data!==null);
  //   if (data!==null){
  //     diaryApi.getDiary(data).then((diary) => {
  //       setDiarydata(diary);
  //     });
  //     onDateSelect(date,diarydata);
  //   }else{
  //     setDiarydata(null);
  //     onDateSelect(date,null);
  //   }
  //   console.log('Calender.tsx',diarydata);
    
  // };

  const handleDateClick = (day: number, data: any) => {
    console.log('Clicked day:', day);
    const date = new Date(year, month, day);

    if (data !== null) {
        // 다이어리 데이터가 있으면 API로 가져옵니다. (비동기)
        diaryApi.getDiary(data).then((diary) => {
            // API 응답이 왔을 때 상태 업데이트 및 콜백 함수 호출
            setDiarydata(diary);
            onDateSelect(date, diary); // ***가져온 최신 데이터를 직접 전달***
            console.log('Calender.tsx - Loaded Data:', diary);
        }).catch(error => {
            // 에러 처리
            console.error('Failed to load diary:', error);
            setDiarydata(null);
            onDateSelect(date, null);
        });
    } else {
        // 다이어리 데이터가 없으면 null로 상태 업데이트 및 콜백 함수 호출 (동기)
        setDiarydata(null);
        onDateSelect(date, null);
        // 이 시점의 console.log(diarydata)는 이전 상태를 출력합니다.
        // 다음 렌더링에서 null이 반영됩니다.
        console.log('Calender.tsx - Cleared (Will be null on next render)');
    }

    // 이 console.log는 onDateSelect 호출 전에 삭제하거나,
    // 이 위치에서는 'diarydata'의 이전 상태를 출력한다는 점을 이해해야 합니다.
    // console.log('Calender.tsx', diarydata); 
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
              // 수정 onClick={() => handleDateClick(day)}
              onClick={() => handleDateClick(day,data?.dailyDiaries[day-1].diaryId)}
              
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
              {data?.dailyDiaries[day-1].hasDiary && (
                <div>
                  <div>{data?.dailyDiaries[day-1].title}</div>
                  <div>{data?.dailyDiaries[day-1].mood}</div>
                </div>
              )}
              
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default Calendar;
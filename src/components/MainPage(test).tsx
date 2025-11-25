import { useState,useEffect } from 'react';
import { Header } from './Header';
import { Calendar } from './Calender.tsx';
import { DiaryEditor } from './DiaryEditor.tsx';
import React from 'react';
import diaryApi from '../api/diaryApiAxios';

export function MainPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDiaryData, setSelectedDiaryData] = useState<any | null>(null);
  const [diaryEntries, setDiaryEntries] = useState<Record<string, { title: string; mood: string; content: string }>>({});
  // DiaryEntryData는 ID를 포함한 상세 타입
  // const [selectedDiaryData, setSelectedDiaryData] = useState<DiaryEntryData | null>(null);

  

  const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleDateSelect = (date: Date, data: any) => {
    console.log('handleDateSelect:', date);
    //수정 console.log('handleDateSelect:', data); 삭제
    console.log('handleDateSelect:', data);
    //수정 setSelectedDate(date);
    setSelectedDate(date);
    setSelectedDiaryData(data);
    console.log("selectedDiaryData:",selectedDiaryData);
  };

  const handleCloseDiary = () => {
    setSelectedDate(null);
  };

  const handleSaveDiary = (date: Date, entry: { title: string; mood: string; content: string }) => {
    console.log('Saving diary entry for', date, entry);
    const dateKey = formatDateKey(date);
    setDiaryEntries(prev => ({
      ...prev,
      [dateKey]: entry
    }));
    console.log('Saving diary entry for', date, entry);
    setSelectedDate(null);
    const diaryData={
      title: entry.title,
      mood: entry.mood,
      content: entry.content
    }
    diaryApi.createDiary(diaryData);
  };

  const handleMonthChange = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50">
      <Header />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-6 transition-all duration-500 ${selectedDate ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* 달력 */}
          <div className={`transition-all duration-500 ${selectedDate ? '' : 'max-w-2xl mx-auto w-full'}`}>
            <Calendar
              currentDate={currentDate}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              onMonthChange={handleMonthChange}
              diaryEntries={diaryEntries}
            />
          </div>

          {/* 일기 에디터 */}
          {selectedDate && (
            <div className="h-[600px] animate-in fade-in slide-in-from-right duration-500">
              <DiaryEditor
                selectedDate={selectedDate}
                onClose={handleCloseDiary}
                onSave={handleSaveDiary}
                // 수정 existingEntry={diaryEntries[formatDateKey(selectedDate)]}
                existingEntry={selectedDiaryData}
              />
            </div>
          )}
        </div>

        {/* 안내 메시지 */}
        {!selectedDate && (
          <div className="text-center mt-8 animate-in fade-in duration-700">
            <p className="text-orange-700/60">
              달력에서 날짜를 선택하여 일기를 작성해보세요 ✨
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default MainPage;
import { useState, useEffect } from 'react';
import { X, Save, Trash2, Edit2, Eye } from 'lucide-react';
import diaryApi from '../api/diaryApiAxios';

interface DiaryEditorProps {
  selectedDate: Date;
  onClose: () => void;
  onSave: (date: Date, entry: { title: string; mood: string; content: string }) => void;
  existingEntry?: any; // dailyDiaries[day-1] 데이터
}

const moodOptions = [
  { value: 'VERY_HAPPY', label: '😄 매우 행복', emoji: '😄' },
  { value: 'HAPPY', label: '😊 행복', emoji: '😊' },
  { value: 'NEUTRAL', label: '😐 보통', emoji: '😐' },
  { value: 'SAD', label: '😢 슬픔', emoji: '😢' },
  { value: 'ANGRY', label: '😠 화남', emoji: '😠' },
];

export function DiaryEditor({ selectedDate, onClose, onSave, existingEntry }: DiaryEditorProps) {
  // 모드: 'read' | 'edit' | 'create'
  const [mode, setMode] = useState<'read' | 'edit' | 'create'>('create');
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('NEUTRAL');
  const [content, setContent] = useState('');
  const [diaryId, setDiaryId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('existingEntry:', existingEntry);
    
    // 일기가 있는 경우 (hasDiary: true)
    if (existingEntry?.hasDiary && existingEntry?.diaryId) {
      setMode('read');
      setDiaryId(existingEntry.diaryId);
      loadDiaryDetail(existingEntry.diaryId);
    } else {
      // 일기가 없는 경우 → 작성 모드
      setMode('create');
      setTitle('');
      setMood('NEUTRAL');
      setContent('');
      setDiaryId(null);
    }
  }, [existingEntry, selectedDate]);

  // 일기 상세 조회
  const loadDiaryDetail = async (id: number) => {
    try {
      setIsLoading(true);
      const data = await diaryApi.getDiary(id);
      setTitle(data.title);
      setMood(data.mood);
      setContent(data.content);
    } catch (error) {
      console.error('일기 조회 실패:', error);
      alert('일기를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 저장 (생성 또는 수정)
  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      const diaryData = { title, mood, content };

      if (mode === 'create') {
        // 생성
        await diaryApi.createDiary({
          ...diaryData,
          diaryDate: selectedDate.toISOString().split('T')[0]
        });
        alert('일기가 저장되었습니다.');
      } else if (mode === 'edit' && diaryId) {
        // 수정
        await diaryApi.updateDiary(diaryId, diaryData);
        alert('일기가 수정되었습니다.');
      }

      onSave(selectedDate, diaryData);
      onClose();
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 삭제
  const handleDelete = async () => {
    if (!diaryId) return;
    
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      setIsLoading(true);
      await diaryApi.deleteDiary(diaryId);
      alert('일기가 삭제되었습니다.');
      onClose();
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekDay = weekDays[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${weekDay})`;
  };

  const getMoodEmoji = (moodValue: string) => {
    return moodOptions.find(m => m.value === moodValue)?.emoji || '😐';
  };

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 h-full flex items-center justify-center">
        <div className="text-orange-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 h-full flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-6 border-b border-orange-200/50">
        <div>
          <h3 className="text-orange-950 mb-1">
            {mode === 'read' ? '일기 읽기' : mode === 'edit' ? '일기 수정' : '일기 작성'}
          </h3>
          <p className="text-orange-700">{formatDate(selectedDate)}</p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* 읽기 모드: 수정/삭제 버튼 */}
          {mode === 'read' && (
            <>
              <button
                onClick={() => setMode('edit')}
                className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                title="수정"
              >
                <Edit2 className="w-5 h-5 text-orange-700" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                title="삭제"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
            </>
          )}
          
          {/* 수정 모드: 읽기 모드로 돌아가기 */}
          {mode === 'edit' && (
            <button
              onClick={() => {
                setMode('read');
                loadDiaryDetail(diaryId!);
              }}
              className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
              title="취소"
            >
              <Eye className="w-5 h-5 text-orange-700" />
            </button>
          )}
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-orange-700" />
          </button>
        </div>
      </div>

      {/* 내용 */}
      <div className="flex-1 p-6 space-y-5 overflow-y-auto">
        {mode === 'read' ? (
          // ========== 읽기 모드 ==========
          <>
            <div>
              <h2 className="text-2xl font-bold text-orange-950 mb-4">{title}</h2>
              <div className="flex items-center gap-2 text-orange-700">
                <span className="text-3xl">{getMoodEmoji(mood)}</span>
                <span>{moodOptions.find(m => m.value === mood)?.label}</span>
              </div>
            </div>
            <div className="text-orange-900 whitespace-pre-wrap leading-relaxed">
              {content}
            </div>
          </>
        ) : (
          // ========== 작성/수정 모드 ==========
          <>
            {/* 제목 입력 */}
            <div>
              <label htmlFor="title" className="block text-orange-900 mb-2">
                제목
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200 text-orange-950 placeholder:text-orange-400/50"
                placeholder="오늘의 제목을 입력하세요"
              />
            </div>

            {/* 기분 상태 선택 */}
            <div>
              <label className="block text-orange-900 mb-3">
                기분 상태
              </label>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setMood(option.value)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-xl border-2 transition-all duration-200
                      ${mood === option.value
                        ? 'bg-orange-100 border-orange-400 scale-105'
                        : 'bg-white/60 border-orange-200 hover:bg-orange-50'
                      }
                    `}
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="text-orange-900">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 내용 입력 */}
            <div className="flex-1 flex flex-col">
              <label htmlFor="content" className="block text-orange-900 mb-2">
                내용
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 min-h-[200px] px-4 py-3 bg-white/60 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200 text-orange-950 placeholder:text-orange-400/50 resize-none"
                placeholder="오늘 하루는 어땠나요? 자유롭게 작성해보세요..."
              />
            </div>
          </>
        )}
      </div>

      {/* 하단 버튼 */}
      {(mode === 'create' || mode === 'edit') && (
        <div className="p-6 border-t border-orange-200/50">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-400 to-rose-500 text-white py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            <span>{mode === 'create' ? '저장하기' : '수정하기'}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default DiaryEditor;
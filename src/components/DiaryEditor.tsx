import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Save, Smile, Meh, Frown, Angry, Heart } from 'lucide-react';
import diaryApi from '../api/diaryApiAxios';

interface DiaryEditorProps {
  selectedDate: Date;
  onClose: () => void;
  onSave: (date: Date, entry: { title: string; mood: string; content: string }) => void;
  existingEntry?: { title: string; mood: string; content: string };
}

const moodOptions = [
  { value: 'HAPPY', label: '행복해요', icon: Smile, color: 'text-yellow-500' },
  { value: 'LOVE', label: '사랑해요', icon: Heart, color: 'text-pink-500' },
  { value: 'NEUTRAL', label: '평온해요', icon: Meh, color: 'text-blue-500' },
  { value: 'SAD', label: '슬퍼요', icon: Frown, color: 'text-indigo-500' },
  { value: 'ANGRY', label: '화나요', icon: Angry, color: 'text-red-500' },
];

export function DiaryEditor({ selectedDate, onClose, onSave, existingEntry }: DiaryEditorProps) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('HAPPY');
  const [content, setContent] = useState('');
  const [hasData,setHasData] = useState(Boolean)
  const [responseData,setResponseData] = useState(null)
  const [createreq] = useState({
    title: '',
    content: '',
    diaryDate: '',
    mood: ''
  })
  const [updateReq] = useState({
    title: '',
    content: '',
    mood: ''
  })

  // useEffect(() => {
  //   if (existingEntry) {
  //     setTitle(existingEntry.title);
  //     setMood(existingEntry.mood);
  //     setContent(existingEntry.content);
  //   } else {
  //     setTitle('');
  //     setMood('happy');
  //     setContent('');
  //   }
  // }, [existingEntry, selectedDate]);
  useEffect(()=>{
    // console.log("main->DiaryEditor.useEffect",selectedDate)
    // console.log("formatDate",formatDatedata(selectedDate))
    diaryApi.getDiaryToDate(formatDatedata(selectedDate)).then((response)=>{
      // console.log(response)
      setResponseData(response)
      if (response!==null){
        setHasData(true)
        // console.log(response!==null)
        setTitle(response?.title)
        setContent(response?.content)
        setMood(response?.mood)
      }else{
        setHasData(false)
        setTitle('');
        setMood('HAPPY');
        setContent('');
      }
    }).catch((err)=>{
      if (err.response?.status === 404){
        setHasData(false)
        setTitle('');
        setContent('');
        setMood('HAPPY');
      }
    })
  },[selectedDate])

  const handleUpdate = () =>{
    updateReq.title=title
    updateReq.content=content
    updateReq.mood=mood
    const id = responseData?.id
    diaryApi.updateDiary(id,updateReq)
    navigate("/")
  }
  const handleSave = () => {
    // if (!title.trim() || !content.trim()) {
    //   alert('제목과 내용을 입력해주세요.');
    //   return;
    // }
    
    // onSave(selectedDate, { title, mood, content });
    createreq.title=title
    createreq.content=content
    createreq.mood=mood
    createreq.diaryDate=formatDatedata(selectedDate)
    // console.log(createreq)
    diaryApi.createDiary(createreq)
    navigate("/")
  };
  const formatDatedata = (date:Date)=>{
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2,'0');
    const day = date.getDate().toString().padStart(2,'0');

    return `${year}-${month}-${day}`
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekDay = weekDays[date.getDay()];
    
    return `${year}년 ${month}월 ${day}일 (${weekDay})`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 h-full flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-6 border-b border-orange-200/50">
        <div>
          <h3 className="text-orange-950 mb-1">일기 작성</h3>
          <p className="text-orange-700">{formatDate(selectedDate)}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-orange-700" />
        </button>
      </div>

      {/* 내용 */}
      <div className="flex-1 p-6 space-y-5 overflow-y-auto">
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
            {moodOptions.map((option) => {
              const Icon = option.icon;
              return (
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
                  <Icon className={`w-5 h-5 ${option.color}`} />
                  <span className="text-orange-900">{option.label}</span>
                </button>
              );
            })}
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
      </div>

      {/* 저장 버튼 */}
      <div className="p-6 border-t border-orange-200/50">
        {!hasData ? (
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-orange-400 to-rose-500 text-white py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>저장하기</span>
        </button>
        ) : (<button
          onClick={handleUpdate}
          className="w-full bg-gradient-to-r from-orange-400 to-rose-500 text-white py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>수정하기</span>
        </button>)}
      </div>
    </div>
  );
}

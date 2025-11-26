import React, { useState } from 'react';
import { Lock, User, Mail, Calendar } from 'lucide-react';
import { data, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

export function SignupPage() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [age, setAge] = useState('');
//   const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    email: '',
    password: '',
    age: ''
  });

  // ✅ 2. 재사용 가능한 handleChange 함수: input의 name 속성을 기반으로 상태를 업데이트합니다.
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value, // [id]는 'username', 'email' 등으로 동적으로 대체됩니다.
    }));
    setError(''); // 입력 시 에러 메시지 초기화
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // console.log('회원가입:', formData);
    try {
          const response = await authApi.signup(formData);
          // console.log('회원가입 성공:', response);
          navigate('/login');
        } catch (err) {

            const data = err.response?.data;

      // 1. validationErrors를 안전하게 추출하고 값들을 배열로 만듭니다. (|| {}로 TypeError 방지)
      // data가 undefined일 수 있으므로 data?.validationErrors를 사용합니다.
      const validationErrorMessages = Object.values(data?.validationErrors || {});
      
      let errorMessage;
      
      if (validationErrorMessages.length > 0) {
          // A. 상세 유효성 검사 오류가 있는 경우: 오류 메시지 목록을 표시 (우선 순위 1)
          errorMessage = validationErrorMessages.join('\n');
      } else {
          // B. 상세 오류가 없고, 일반 메시지(message)가 있는 경우: 일반 메시지를 표시 (우선 순위 2)
          // data?.message가 없으면 '알 수 없는 오류'를 최종 기본값으로 사용
          errorMessage = data?.message || '알 수 없는 오류가 발생했습니다.';
      }

      alert(errorMessage);
      setError(errorMessage);
    //   const data = err.response?.data;

    //   if (data) {
    //       // 1. validationErrors 객체를 안전하게 추출하거나 빈 객체({})를 기본값으로 사용합니다.
    //       // Object.values() 충돌을 방지하기 위해 || {} 사용
    //       const validationErrors = data.validationErrors || {}; 
          
    //       // validationErrors 객체에 실제 오류 메시지가 있는지 확인
    //       if (Object.keys(validationErrors).length > 0) {
    //           // 객체의 값(메시지)들만 추출하여 줄바꿈(\n)으로 연결합니다.
    //           const errorMessages = Object.values(validationErrors); 
    //           errorMessage = errorMessages.join('\n');
    //       } 
    //       // 2. validationErrors가 없거나 비어있고, 일반 메시지(message)가 있는 경우
    //       else if (data.message) {
    //           errorMessage = data.message;
    //       }
    //     }

            // if ((err.response?.data?.validationErrors).length > 0) {
            //     const validationErrors = err.response?.data?.validationErrors;
            //     const combinedMessage = Object.values(validationErrors).join('\n');
            //     console.error('회원가입 실패:', combinedMessage);
            //     alert(combinedMessage);
            //     setError(combinedMessage);
            // }else{
            //     alert(err.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
            //     setError(err.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
            // }

            // const validationErrors = err.response?.data?.validationErrors;
            // const combinedMessage = Object.values(validationErrors).join('\n');
            // console.error('회원가입 실패:', combinedMessage);
            // alert(combinedMessage);
            // setError(combinedMessage);
            
            // alert(err.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
            
        

        }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-md relative">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-rose-500 rounded-2xl mb-4 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-orange-950 mb-2">회원가입</h1>
            <p className="text-orange-800/60">새 계정을 만들어 시작하세요</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-orange-900 mb-2">
                사용자 이름
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-orange-400" />
                </div>
                <input
                id="username"
                type="text"
                value={formData.username}  
                onChange={handleChange}
                //   id="username"
                //   type="text"
                //   value={username}
                //   onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/60 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200 text-orange-950 placeholder:text-orange-400/50"
                  placeholder="사용자 이름을 입력하세요"
                  required
                />
              </div>
            </div>
            {/* Nickname Input */}
            <div>
              <label htmlFor="nickname" className="block text-orange-900 mb-2">
                닉네임
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-orange-400" />
                </div>
                <input
                  id="nickname"
                  type="text"
                  value={formData.nickname}  
                onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/60 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200 text-orange-950 placeholder:text-orange-400/50"
                  placeholder="닉네임을 입력하세요"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-orange-900 mb-2">
                이메일
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-orange-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}  
                onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/60 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200 text-orange-950 placeholder:text-orange-400/50"
                  placeholder="이메일을 입력하세요"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-orange-900 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-orange-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={formData.password}  
                onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/60 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200 text-orange-950 placeholder:text-orange-400/50"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>
            </div>

            {/* Age Input */}
            <div>
              <label htmlFor="age" className="block text-orange-900 mb-2">
                나이
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="w-5 h-5 text-orange-400" />
                </div>
                <input
                  id="age"
                  type="number"
                  value={formData.age}  
                onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/60 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200 text-orange-950 placeholder:text-orange-400/50"
                  placeholder="나이를 입력하세요"
                  min="1"
                  max="150"
                  required
                />
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-rose-500 text-white py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              회원가입
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-orange-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white/80 px-4 text-orange-600/60">이미 계정이 있으신가요?</span>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={handleLoginRedirect}
            className="w-full bg-white border-2 border-orange-300 text-orange-700 py-3 rounded-xl hover:bg-orange-50 hover:border-orange-400 hover:shadow-md transition-all duration-200"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  
  );
}

export default SignupPage;
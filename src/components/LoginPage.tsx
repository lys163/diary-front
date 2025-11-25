import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';


function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleSignup = () => {
    console.log('회원가입 페이지로 이동');
    navigate('/signup');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.login(credentials);
      console.log('로그인 성공:', response);
      navigate('/main');
    } catch (err) {
      console.error('로그인 실패:', err.response?.data?.message);
      alert(err.response?.data?.message);
      setError(err.response?.data?.message || '로그인 실패');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100 p-4">
      <div className="w-full max-w-md">
        {/* 로그인 카드 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-orange-100">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-rose-500 rounded-2xl mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-gray-800 mb-2">환영합니다</h1>
            <p className="text-gray-600">계정에 로그인하세요</p>
          </div>

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username 입력 */}
            <div>
              <label htmlFor="username" className="block text-gray-700 mb-2">
                사용자 이름
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({
                    ...credentials,
                    username: e.target.value })}
                  placeholder="사용자 이름을 입력하세요"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Password 입력 */}
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({
                    ...credentials,
                    password: e.target.value })}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* 비밀번호 찾기 링크 */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-orange-500 hover:text-orange-600 transition-colors text-sm"
              >
                비밀번호를 잊으셨나요?
              </button>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-400 to-rose-500 text-white rounded-xl hover:from-orange-500 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              로그인
            </button>

            {/* 구분선 */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">또는</span>
              </div>
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="button"
              onClick={handleSignup}
              className="w-full py-3 bg-white text-orange-500 rounded-xl border-2 border-orange-400 hover:bg-orange-50 transition-all"
            >
              회원가입
            </button>
          </form>

          {/* 푸터 텍스트 */}
          <p className="text-center text-gray-500 text-sm mt-6">
            계속 진행하시면 서비스 약관 및 개인정보 보호정책에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
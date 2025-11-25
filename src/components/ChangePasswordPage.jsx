import { useState } from 'react';
import { Header } from './Header';
import { Lock, ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ChangePasswordPage() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (newPassword.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    console.log('비밀번호 변경:', { currentPassword, newPassword });
    alert('비밀번호가 변경되었습니다!');
    navigate('/profile');
  };

  const handleBack = () => {
    navigate('/profile');
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
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={handleBack}
            className="mb-6 flex items-center space-x-2 text-orange-700 hover:text-orange-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>돌아가기</span>
          </button>

          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-rose-500 rounded-2xl mb-4 shadow-lg">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-orange-950 mb-2">비밀번호 변경</h1>
            <p className="text-orange-800/60">새로운 비밀번호를 설정하세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 현재 비밀번호 */}
            <div>
              <label htmlFor="currentPassword" className="block text-orange-900 mb-2">
                현재 비밀번호
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-orange-400" />
                </div>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/60 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200 text-orange-950 placeholder:text-orange-400/50"
                  placeholder="현재 비밀번호를 입력하세요"
                  required
                />
              </div>
            </div>

            {/* 새 비밀번호 */}
            <div>
              <label htmlFor="newPassword" className="block text-orange-900 mb-2">
                새 비밀번호
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-orange-400" />
                </div>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/60 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200 text-orange-950 placeholder:text-orange-400/50"
                  placeholder="새 비밀번호를 입력하세요"
                  minLength={6}
                  required
                />
              </div>
              <p className="mt-1 text-orange-700/60">최소 6자 이상 입력해주세요</p>
            </div>

            {/* 새 비밀번호 확인 */}
            <div>
              <label htmlFor="confirmPassword" className="block text-orange-900 mb-2">
                새 비밀번호 확인
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-orange-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/60 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200 text-orange-950 placeholder:text-orange-400/50"
                  placeholder="새 비밀번호를 다시 입력하세요"
                  minLength={6}
                  required
                />
              </div>
              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <p className="mt-1 text-red-500">비밀번호가 일치하지 않습니다</p>
              )}
              {newPassword && confirmPassword && newPassword === confirmPassword && (
                <p className="mt-1 text-green-500">비밀번호가 일치합니다</p>
              )}
            </div>

            {/* 변경 버튼 */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-rose-500 text-white py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>비밀번호 변경</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
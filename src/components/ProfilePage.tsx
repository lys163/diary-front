import { useState, useEffect, use } from 'react';
import { Header } from './Header';
import { User, Mail, Calendar, Lock, Save, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import userApi from '../api/userApi';
import AuthApi from '../api/authApi';
import { set } from 'date-fns';


export function ProfilePage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const [username, setUsername] = useState('');
  // const [nickname, setNickname] = useState('');
  // const [email, setEmail] = useState('');
  // const [age, setAge] = useState('');
  // const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    email: '',
    age: '',
  });
  
  

  useEffect(() => {
    userApi.getMyInfo().then((response) => {
      console.log('username:', response.username);
      console.log('nickname:', response.nickname);
      console.log('email:', response.email);
      console.log('age:', response.age);
      setFormData({
        username: response.username,
        nickname: response.nickname,
        email: response.email,
        age: response.age,
      });
      
    })
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value, // [id]는 'username', 'email' 등으로 동적으로 대체됩니다.
    }));
    setError(''); // 입력 시 에러 메시지 초기화
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updateData = {
      email: formData.email,
      nickname: formData.nickname,
      age: formData.age,
    };
    console.log('Update Data:', updateData);
    userApi.updateMyInfo(updateData)
    alert('프로필이 업데이트되었습니다!');
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      '정말로 계정을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.'
    );
    
    if (confirmed) {
      const doubleConfirm = window.confirm(
        '모든 일기와 데이터가 영구적으로 삭제됩니다.\n정말 진행하시겠습니까?'
      );
      
      if (doubleConfirm) {
        userApi.deleteAccount();
        console.log('계정 삭제');
        alert('계정이 삭제되었습니다.');
        
        AuthApi.logout();
        navigate('/login');
      }
    }
  };

  const handleChangePassword = () => {
    navigate('/change-password');
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
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-rose-500 rounded-2xl mb-4 shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-orange-950 mb-2">내 정보</h1>
            <p className="text-orange-800/60">프로필 정보를 관리하세요</p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* 사용자 이름 (변경 불가) */}
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
                  disabled
                  className="w-full pl-12 pr-4 py-3 bg-orange-50/50 border-2 border-orange-200/50 rounded-xl text-orange-950/50 cursor-not-allowed"
                />
              </div>
              <p className="mt-1 text-orange-700/60">사용자 이름은 변경할 수 없습니다</p>
            </div>

            {/* 이메일 (변경 불가) */}
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
                  disabled
                  className="w-full pl-12 pr-4 py-3 bg-orange-50/50 border-2 border-orange-200/50 rounded-xl text-orange-950/50 cursor-not-allowed"
                />
              </div>
              <p className="mt-1 text-orange-700/60">이메일은 변경할 수 없습니다</p>
            </div>
            {/* 닉네임 (변경 가능) */}
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
                  // onChange={(e) => setNickname(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/60 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200 text-orange-950 placeholder:text-orange-400/50"
                  min="1"
                  max="150"
                  required
                />
              </div>
            </div>
            {/* 나이 (변경 가능) */}
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
                  // onChange={(e) => setAge(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/60 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-200 text-orange-950 placeholder:text-orange-400/50"
                  min="1"
                  max="150"
                  required
                />
              </div>
            </div>

            {/* 비밀번호 변경 버튼 */}
            <div>
              <label className="block text-orange-900 mb-2">
                비밀번호
              </label>
              <button
                type="button"
                onClick={handleChangePassword}
                className="w-full flex items-center justify-between px-4 py-3 bg-white/60 border-2 border-orange-200 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 text-orange-900"
              >
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-orange-400" />
                  <span>비밀번호 변경하기</span>
                </div>
                <span className="text-orange-600">→</span>
              </button>
            </div>

            {/* 수정 버튼 */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-rose-500 text-white py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>수정하기</span>
            </button>
          </form>

          {/* 회원탈퇴 버튼 */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>회원탈퇴</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
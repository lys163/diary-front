import { LogOut, User, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import React, {useState, useEffect, use} from 'react';
import userApi from '../api/userApi';
import authApi from '../api/authApi';


export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    userApi.getMyInfo().then((response) => {
      setNickname(response.nickname);
    });
  });
  const handleLogout = () => {
    authApi.logout();
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleMain = () => {
    navigate('/main');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-orange-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={handleMain}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-rose-500 rounded-xl flex items-center justify-center">
              <span className="text-white">📔</span>
            </div>
            <h2 className="text-orange-950">어제의 나</h2>
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleMain}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/main' 
                  ? 'bg-orange-100 text-orange-900' 
                  : 'text-orange-700 hover:text-orange-900 hover:bg-orange-50'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>달력</span>
            </button>
            
            <button
              onClick={handleProfile}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/profile' || location.pathname === '/change-password'
                  ? 'bg-orange-100 text-orange-900' 
                  : 'text-orange-700 hover:text-orange-900 hover:bg-orange-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>내 정보</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-orange-700 hover:text-orange-900 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <span>로그아웃</span>
              <LogOut className="w-4 h-4" />
            </button>
            <div></div>
            <div className="flex items-center space-x-2 px-4 py-2 text-orange-700 hover:text-orange-900 hover:bg-orange-50 rounded-lg transition-colors">
            {nickname}님
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
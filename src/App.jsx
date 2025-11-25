import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// 로그인 페이지
import LoginPage from './components/LoginPage.tsx';
//회원가입 페이지
import SignupPage from './components/SignupPage.tsx';
//메인페이지
import { MainPage } from './components/MainPage.tsx';
//회원정보 페이지
import { ProfilePage } from './components/ProfilePage.tsx';
// 비밀번호 변경 페이지
import { ChangePasswordPage } from './components/ChangePasswordPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/" element={<Navigate to="/main" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

import api from './axios';

export const authApi = {
  // 회원가입
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  // 로그인
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    const { token, ...user } = response.data;
    
    // 토큰과 사용자 정보 저장
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // 사용자명 중복 체크
  checkUsername: async (username) => {
    const response = await api.get(`/auth/check-username?username=${username}`);
    return response.data; // true/false
  },

  // 이메일 중복 체크
  checkEmail: async (email) => {
    const response = await api.get(`/auth/check-email?email=${email}`);
    return response.data; // true/false
  },
};
export default authApi;
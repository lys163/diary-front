import api from './axios';

export const userApi = {
  // 내 정보 조회
  getMyInfo: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  // 내 정보 수정
  updateMyInfo: async (userData) => {
    await api.put('/users/me', userData);
  },

  // 비밀번호 변경
  changePassword: async (passwordData) => {
    await api.put('/users/me/password', passwordData);
  },

  // 회원 탈퇴
  deleteAccount: async () => {
    await api.delete('/users/me');
  },

  // ========== 관리자 전용 ==========

  // 전체 사용자 목록
  getAllUsers: async (page = 0, size = 20) => {
    const response = await api.get(`/users?page=${page}&size=${size}`);
    return response.data;
  },

  // 사용자 통계
  getUserStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },
};

export default userApi;
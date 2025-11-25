const API_BASE_URL = 'http://localhost:8080/api';

const api = {
  // 로그인
  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) throw new Error('로그인 실패');
    return response.json();
  },

  // 월별 달력 조회
  // getCalendar: async (year, month, token) => {
  //   const response = await fetch(`${API_BASE_URL}/diaries/calendar/${year}/${month}`, {
  //     headers: { 'Authorization': `Bearer ${token}` }
  //   });
  //   if (!response.ok) throw new Error('달력 조회 실패');
  //   return response.json();
  // },
  getCalendar: async (year, month, token) => {
    const response = await fetch(`${API_BASE_URL}/diaries/calendar/${year}/${month}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('달력 조회 실패');
    return response.json();
  },

  // 일기 상세 조회
  getDiary: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/diaries/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('일기 조회 실패');
    return response.json();
  },

  // 일기 작성
  createDiary: async (diaryData, token) => {
    const response = await fetch(`${API_BASE_URL}/diaries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(diaryData)
    });
    if (!response.ok) throw new Error('일기 작성 실패');
    return response.json();
  },

  // 일기 수정
  updateDiary: async (id, diaryData, token) => {
    const response = await fetch(`${API_BASE_URL}/diaries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(diaryData)
    });
    if (!response.ok) throw new Error('일기 수정 실패');
    return response.json();
  },

  // 일기 삭제
  deleteDiary: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/diaries/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('일기 삭제 실패');
  }
};

export default api;
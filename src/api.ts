/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

// Базовый URL для локального бекенда
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Хранение токена в памяти
let accessToken: string | null = null;

// Установка токена в заголовки
export const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Логин
export const login = async (username: string, password: string) => {
  const res = await api.post('auth/token/', { username, password });
  const { access, refresh } = res.data;
  setAccessToken(access);
  localStorage.setItem('refreshToken', refresh);
  return { access, refresh };
};

// Обновление access через refresh
export const refreshToken = async () => {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) return null;
  try {
    const res = await api.post('auth/token/refresh/', { refresh });
    setAccessToken(res.data.access);
    return res.data.access;
  } catch {
    setAccessToken(null);
    localStorage.removeItem('refreshToken');
    return null;
  }
};

// Получение рецептов
export const getRecipes = async () => {
  const res = await api.get('v1/recipes/');
  return res.data;
};

export default api;

import { auth } from '@/app/firebase';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await auth.currentUser?.getIdToken(true);

  if (!token) {
    return config;
  }

  document.cookie = `tokenId=${token}`;
  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});
import api from '@/lib/axios';
import { RegisterForm } from '@/schemas';

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },

  register: async (payload: RegisterForm) => {
    const { data } = await api.post('/auth/register', {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    });
    return data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const { data } = await api.post('/auth/verify-otp', { email, otp });
    return data;
  },

  getProfile: async () => {
    const { data } = await api.get('/auth/profile');
    return data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
  },
};
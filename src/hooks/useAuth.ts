'use client';

import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';

export const useAuth = () => {
  const { login, logout, setUser } = useAuthStore();

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      login(response.access_token, response.user);
      toast.success('Login successful!');
      return response;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const signUp = async (data: any) => {
    try {
      await authService.register(data);
      toast.success('Account created! Please verify your email.');
      return true;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    try {
      await authService.verifyOtp(email, otp);
      toast.success('Email verified successfully!');
      return true;
    } catch (error: any) {
      toast.error('Invalid or expired OTP');
      throw error;
    }
  };

  return {
    signIn,
    signUp,
    verifyOtp,
    logout,
    getProfile: authService.getProfile,
  };
};
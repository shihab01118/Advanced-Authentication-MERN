import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password
      });
      set({ user: data?.user, isAuthenticated: true, isLoading: false });
      console.log("sign up response: ", data);
    } catch (error) {
      set({
        error: error?.response?.data?.message || 'Error in signup!',
        isLoading: false
      });
      console.log("sign up error: ",error);
      throw error;
    }
  },

  verifyEmail: async (verificationCode) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await axios.post(`${API_URL}/verify-email`, {
        verificationCode
      });
      set({ user: data?.user, isAuthenticated: true, isLoading: false });
      console.log("verify email response: ", data);
      return data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || 'Error verifying email!',
        isLoading: false
      });
      console.log("verify email error: ",error);
      throw error;
    }
  }
}));

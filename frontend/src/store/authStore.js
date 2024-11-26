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
    } catch (error) {
      set({
        error: error?.response?.data?.message || 'Error in signup!',
        isLoading: false
      });
      console.log(error);
      throw error;
    }
  }
}));

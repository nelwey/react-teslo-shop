import type { User } from '@/interfaces/user.interface';
import { create } from 'zustand'
import { loginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-auth.action';
import { registerAction } from '../actions/register.action';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
  //Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
  //Getters
  isAdmin: () => boolean;
  //Actions
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  //Implementacion del Store
  user: null,
  token: null,
  authStatus: 'checking',
  //Getterslogin
  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.includes('admin');
  },
  //Actions
  register: async (fullName: string, email: string, password: string) => {
    try {
      const data = await registerAction(fullName, email, password);
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, authStatus: 'authenticated' })
      return true;
    } catch (error) {
      console.log(error);
      localStorage.removeItem('token');
      set({ user: null, token: null, authStatus: 'not-authenticated' })
      return false;
    }
  },
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, authStatus: 'authenticated' })
      return true;
    } catch (error) {
      console.log(error);
      localStorage.removeItem('token');
      set({ user: null, token: null, authStatus: 'not-authenticated' })
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, authStatus: 'not-authenticated' })
  },
  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({
        user: user,
        token: token,
        authStatus: 'authenticated'
      })
      return true;
    } catch (error) {
      console.log(error);
      set({ user: undefined, token: undefined, authStatus: 'not-authenticated' })
      return false;
    }
  }
}));

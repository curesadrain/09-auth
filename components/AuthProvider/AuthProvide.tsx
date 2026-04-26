'use client';

import { CheckSession, GetMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuth = useAuthStore((state) => state.clearIsAuth);

  useEffect(() => {
    const fetchUser = async () => {
      const isAuth = await CheckSession();
      if (isAuth) {
        const user = await GetMe();
        if (user) setUser(user);
      } else {
        clearIsAuth();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuth]);
  return children;
}

export default AuthProvider;

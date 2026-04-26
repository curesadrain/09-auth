'use client';

import { Logout } from '@/lib/api/clientApi';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

function AuthNavigation() {
  const { isAuth, user } = useAuthStore();
  const router = useRouter();
  const clearIsAuth = useAuthStore((state) => state.clearIsAuth);

  const handleLogout = async () => {
    await Logout();
    clearIsAuth();
    router.push('/sign-in');
  };

  return isAuth ? (
    <>
      <li>
        <Link href="/notes/filter/all">Notes</Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button onClick={handleLogout} className={css.logoutButton}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}

export default AuthNavigation;

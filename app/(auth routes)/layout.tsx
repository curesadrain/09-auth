'use client';

import Loader from '@/components/Loader/Loader';
import { useRouter } from 'next/navigation';
import { startTransition, useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Примусово оновлюємо серверні дані
    router.refresh();

    // 2. Безпечно оновлюємо стан loading
    startTransition(() => {
      setLoading(false);
    });
  }, [router]);

  return <>{loading ? <Loader /> : children}</>;
}

export default AuthLayout;

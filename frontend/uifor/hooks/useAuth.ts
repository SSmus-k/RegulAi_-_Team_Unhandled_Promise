import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(redirectIfNoAuth: boolean = false) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
    setToken(stored);
    setLoading(false);
    if (redirectIfNoAuth && !stored) {
      router.replace('/auth/login');
    }
  }, [redirectIfNoAuth, router]);

  return { token, loading };
}

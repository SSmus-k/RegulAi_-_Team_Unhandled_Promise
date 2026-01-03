"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../../components/AuthForm';
import { login } from '../../../services/auth';
import { useAuth } from '../../../hooks/useAuth';

export default function LoginPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (token) {
    router.replace('/dashboard');
  }

  async function handleLogin({ username, password }: { username: string; password: string }) {
    setLoading(true);
    setError('');
    try {
      const data = await login(username, password);
      localStorage.setItem('jwt', data.access);
      router.replace('/dashboard');
    } catch (e: any) {
      setError(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return <AuthForm type="login" onSubmit={handleLogin} loading={loading} error={error} />;
}

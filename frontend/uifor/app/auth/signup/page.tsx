"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../../components/AuthForm';
import { signup, login } from '../../../services/auth';
import { useAuth } from '../../../hooks/useAuth';

export default function SignupPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (token) {
    router.replace('/dashboard');
    return null;
  }

  async function handleSignup({ username, password, email }: { username: string; password: string; email?: string }) {
    setLoading(true);
    setError('');
    try {
      await signup(username, email || '', password);
      // Auto-login after signup
      const data = await login(username, password);
      localStorage.setItem('jwt', data.access);
      router.replace('/dashboard');
    } catch (e: any) {
      setError(e.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  return <AuthForm type="signup" onSubmit={handleSignup} loading={loading} error={error} />;
}

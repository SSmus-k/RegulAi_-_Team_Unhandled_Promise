"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../../components/AuthForm';
import { signup, login } from '../../../services/auth';
import { useAuth } from '../../../hooks/useAuth';

export default function SignupPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      router.replace("/dashboard");
    }
  }, [token, router]);

  async function handleSignup({ username, password, email }: { username: string; password: string; email?: string }) {
    setLoading(true);
    setError('');
    try {
      await signup(username, email || '', password);

      // Auto-login after successful signup
      const data = await login(username, password);
      localStorage.setItem('jwt', data.access);
      localStorage.setItem('jwt_refresh', data.refresh); // save refresh token too
      router.replace('/dashboard');
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Signup failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return <AuthForm type="signup" onSubmit={handleSignup} loading={loading} error={error} />;
}
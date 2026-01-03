import { useState } from 'react';
import Link from 'next/link';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (data: { username: string; password: string; email?: string }) => Promise<void>;
  loading: boolean;
  error: string;
}

export default function AuthForm({ type, onSubmit, loading, error }: AuthFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className='flex bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] h-screen justify-center p-20'>
      <form
        className="bg-white/10 backdrop-blur-lg text-neutral-200 p-6 pb-8 rounded shadow h-fit max-w-sm w-full"
        onSubmit={e => {
          e.preventDefault();
          onSubmit({ username, password, email });
        }}
        aria-label={type === 'login' ? 'Login Form' : 'Signup Form'}
      >
        <h2 className="text-xl font-bold mb-4 text-white">{type === 'login' ? 'Login' : 'Sign Up'}</h2>
        <label className="block mb-2 font-medium text-sm">Username</label>
        <input
          className="w-full bg-white/20 border border-white/10 mb-4 p-2 rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        {type === 'signup' && (
          <>
            <label className="block mb-2 font-medium text-sm">Email</label>
            <input
              className="w-full mb-4 p-2 bg-white/20 border border-white/10 rounded"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </>
        )}
        <label className="block mb-2 font-medium text-sm">Password</label>
        <input
          className="w-full mb-4 p-2 bg-white/20 border border-white/10 rounded"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 bg-blue-700 text-white rounded font-semibold mt-2 hover:bg-blue-800 transition"
          disabled={loading}
        >
          {loading ? 'Loading...' : type === 'login' ? 'Login' : 'Sign Up'}
        </button>
          {
            type === 'signup' &&
          <div className='mt-4 text-right text-sm'>
            Already have an account?
            <Link className='underline ml-1' href={'/auth/login'}>
              login
            </Link>
        </div>
          }
          {
            type === 'login' &&
          <div className='mt-4 text-right text-sm'>
            Don't have an account? 
            <Link className='underline ml-1' href={'/auth/signup'}>
              signup
            </Link>
        </div>
          }
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { useSignInEmailPassword } from '@nhost/react';
import { Link, Navigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { Toaster } from 'react-hot-toast';
import { ArrowRight } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInEmailPassword, isLoading, isSuccess, isError, error } = useSignInEmailPassword();

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signInEmailPassword(email, password);
  };

  if (isSuccess) return <Navigate to="/" replace />;

  return (
    <AuthLayout
      title="Welcome Back to Subspace Pro"
      subtitle="Sign in to continue your AI conversation journey."
    >
      <Toaster />
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground">
          Sign In
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/sign-up" className="font-medium text-primary hover:text-primary/80">
            Sign Up
          </Link>
        </p>
      </div>
      <form onSubmit={handleSignIn} className="space-y-6">
        {isError && (
          <div className="p-3 bg-red-500/10 text-red-400 rounded-md border border-red-500/20 text-sm">
            {error?.message || 'An unknown error occurred.'}
          </div>
        )}
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 
                       bg-white text-black 
                       dark:bg-zinc-900 dark:text-zinc-100 
                       border border-zinc-300 dark:border-zinc-700 
                       rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
                       transition"
            placeholder="Email address"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 
                       bg-white text-black 
                       dark:bg-zinc-900 dark:text-zinc-100 
                       border border-zinc-300 dark:border-zinc-700 
                       rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
                       transition"
            placeholder="Password"
          />
        </div>
        <div>
         <button
  type="submit"
  disabled={isLoading}
  className="group relative w-full flex justify-center items-center gap-2 py-3 px-6 
             rounded-xl text-sm font-semibold 
             text-white 
             bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
             hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600
             shadow-lg shadow-indigo-200/50
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400
             disabled:opacity-60 disabled:cursor-not-allowed
             transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
>
  {isLoading ? 'Authenticating...' : 'Sign In'}
  <ArrowRight
    className={`h-5 w-5 transition-transform duration-300 ${
      isLoading ? '' : 'group-hover:translate-x-1'
    }`}
  />
</button>

        </div>
      </form>
    </AuthLayout>
  );
};

export default SignIn;

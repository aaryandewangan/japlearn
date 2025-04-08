'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/app/components/layout/Header';
import SakuraAnimation from '@/app/components/SakuraAnimation';

interface FormData {
  email: string;
  password: string;
  name: string;
  isSignUp: boolean;
}

// Animation variants
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.4,
    ease: "easeOut"
  }
};

const backgroundVariants = {
  initial: { scale: 1.2, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const floatingVariants = {
  animate: {
    y: ["0%", "-15%", "0%"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const circleVariants = {
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 360],
    borderRadius: ["50%", "40%", "50%"],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const registered = searchParams.get('registered');

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    isSignUp: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        remember: rememberMe,
        redirect: false,
      });

      if (result?.ok) {
        await fetch('/api/user/last-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ activity: 'login' })
        });
        router.push(callbackUrl);
      } else {
        setError(result?.error || 'Failed to login');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <Header />
      <main className="flex-1 flex">
        {/* Left Section - Branding */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-500 to-pink-600 p-12 items-center justify-center relative overflow-hidden"
        >
          {/* Background Animation */}
          <motion.div
            variants={backgroundVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-600/20 backdrop-blur-3xl"
          />
          
          <div className="relative z-10 text-white max-w-lg text-center">
            <motion.div
              variants={floatingVariants}
              animate="animate"
            >
              <motion.h2 
                variants={textVariants}
                initial="initial"
                animate="animate"
                className="text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80"
              >
                始めましょう
              </motion.h2>
              <motion.h1 
                variants={textVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold mb-6 text-transparent bg-clip-text 
                  bg-gradient-to-r from-white/90 to-white/70"
              >
                Let's Begin
              </motion.h1>
            </motion.div>
          </div>

          {/* Enhanced animated shapes */}
          <motion.div
            variants={circleVariants}
            animate="animate"
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br 
              from-white/20 to-white/5 rounded-full blur-sm"
            style={{
              filter: 'blur(8px)'
            }}
          />
          <motion.div
            variants={circleVariants}
            animate="animate"
            transition={{ delay: 0.5 }}
            className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br 
              from-white/20 to-white/5 rounded-full blur-sm"
            style={{
              filter: 'blur(8px)'
            }}
          />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br 
              from-white/20 to-white/5 rounded-full blur-sm"
          />
        </motion.div>

        {/* Right Section - Login Form */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="w-full lg:w-1/2 flex items-center justify-center p-8"
        >
          <motion.div 
            variants={fadeInUp}
            className="w-full max-w-md"
          >
            {registered && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 text-green-500 text-sm text-center bg-green-50 dark:bg-green-500/10 p-3 rounded-lg"
              >
                Account created successfully! Please log in.
              </motion.div>
            )}

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h2>
              <p className="text-gray-600 dark:text-gray-400">Please enter your details to sign in</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                    focus:ring-2 focus:ring-red-500/20 focus:border-red-500 
                    transition-all duration-200 outline-none"
                  placeholder="Enter your email"
                  required
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                    focus:ring-2 focus:ring-red-500/20 focus:border-red-500 
                    transition-all duration-200 outline-none"
                  placeholder="Enter your password"
                  required
                />
              </motion.div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-500/10 p-3 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                variants={fadeInUp}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-lg text-white font-medium bg-red-500 hover:bg-red-600 
                  transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </motion.button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link 
                  href="/signup" 
                  className="font-medium text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </motion.div>
        </motion.div>
      </main>
      <SakuraAnimation />
    </motion.div>
  );
} 
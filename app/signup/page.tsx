'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/layout/Header';
import SakuraAnimation from '@/app/components/SakuraAnimation';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Add the same animation variants as in login page
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

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate name
    if (!formData.name.trim()) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Validate password
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'Email already registered') {
          toast.error('This email is already registered. Please try logging in instead.');
        } else {
          toast.error(data.error || 'Something went wrong');
        }
        return;
      }

      toast.success('Registration successful!');
      router.push('/login');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
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
        {/* Left Section - Sign Up Form */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex items-center justify-center p-8"
        >
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
              <p className="text-gray-600 dark:text-gray-400">Join our community today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                    focus:ring-2 focus:ring-red-500/20 focus:border-red-500 
                    transition-all duration-200 outline-none"
                  placeholder="Enter your name"
                  required
                />
              </motion.div>

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
                  placeholder="Create a password"
                  required
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                    focus:ring-2 focus:ring-red-500/20 focus:border-red-500 
                    transition-all duration-200 outline-none"
                  placeholder="Confirm your password"
                  required
                />
              </motion.div>

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
                className="w-full py-3 px-6 rounded-xl text-white font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  'Sign Up'
                )}
              </motion.button>
            </form>

            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400"
            >
              Already have an account?{' '}
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <Link 
                  href="/login" 
                  className="font-medium text-red-500 hover:text-red-600 transition-colors duration-300"
                >
                  Log in
                </Link>
              </motion.span>
            </motion.p>
          </div>
        </motion.div>

        {/* Right Section - Branding */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 p-12 items-center justify-center relative overflow-hidden"
        >
          <motion.div
            variants={backgroundVariants}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-3xl"
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
                新しい冒険
              </motion.h2>
              <motion.h1 
                variants={textVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold mb-6 bg-clip-text text-transparent 
                  bg-gradient-to-r from-white/90 to-white/70"
              >
                New Adventure
              </motion.h1>
            </motion.div>
          </div>

          {/* Enhanced animated shapes with different colors */}
          <motion.div
            variants={circleVariants}
            animate="animate"
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br 
              from-indigo-400/20 to-white/5 rounded-full blur-sm"
            style={{
              filter: 'blur(8px)'
            }}
          />
          <motion.div
            variants={circleVariants}
            animate="animate"
            transition={{ delay: 0.5 }}
            className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br 
              from-indigo-400/20 to-white/5 rounded-full blur-sm"
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
              from-indigo-400/20 to-white/5 rounded-full blur-sm"
          />
        </motion.div>
      </main>
    </motion.div>
  );
} 
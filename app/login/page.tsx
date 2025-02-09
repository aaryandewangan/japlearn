'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Header from '@/app/components/layout/Header';
import SakuraAnimation from '@/app/components/SakuraAnimation';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login data:', formData);
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <SakuraAnimation />
        <div className="relative w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />

            <motion.div
              className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/30 relative overflow-hidden"
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10"
              >
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent"
                >
                  Welcome Back
                </motion.h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div 
                    variants={itemVariants}
                    className="group"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-3 rounded-xl border-2 border-transparent bg-white dark:bg-slate-800 text-black dark:text-white transition-all duration-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none group-hover:border-red-500/50"
                        required
                      />
                      <motion.div
                        initial={false}
                        animate={formData.email ? { scale: 1 } : { scale: 0 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full"
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={itemVariants}
                    className="group"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-5 py-3 rounded-xl border-2 border-transparent bg-white dark:bg-slate-800 text-black dark:text-white transition-all duration-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none group-hover:border-red-500/50"
                        required
                      />
                      <motion.div
                        initial={false}
                        animate={formData.password ? { scale: 1 } : { scale: 0 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full"
                      />
                    </div>
                  </motion.div>

                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl text-white font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/20"
                  >
                    Log In
                  </motion.button>
                </form>

                <motion.p 
                  variants={itemVariants}
                  className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400"
                >
                  Don't have an account?{' '}
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-block"
                  >
                    <Link 
                      href="/signup" 
                      className="font-medium text-red-500 hover:text-red-600 transition-colors duration-300"
                    >
                      Sign up
                    </Link>
                  </motion.span>
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 
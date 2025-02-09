'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
          >
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                {isMounted && (
                  <TypeAnimation
                    sequence={[
                      'Master Japanese',
                      1000,
                      'マスター日本語',
                      1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                )}
                <span className="text-[#6C47FF] block mt-2">
                  The Smart Way
                </span>
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Learn Japanese with our interactive lessons, from complete beginner to advanced level. 
                Master Hiragana, Katakana, Kanji, and more!
              </motion.p>
              <motion.div 
                className="flex gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link href="/dashboard">
                  <motion.button 
                    className="bg-[#6C47FF] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Learning Now
                  </motion.button>
                </Link>
                <Link href="#features">
                  <motion.button 
                    className="bg-white text-gray-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div 
          id="features" 
          className="py-24 bg-white dark:bg-gray-800"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose JapLearn?
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Everything you need to master Japanese language
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:shadow-xl transition-all"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Getting Started Section */}
        <motion.div 
          className="py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
                <p className="text-indigo-100">
                  Begin your Japanese learning journey today
                </p>
              </div>
              <div className="flex justify-center">
                <Link href="/dashboard">
                  <motion.button 
                    className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-medium hover:bg-indigo-50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started for Free
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

const features = [
  {
    icon: '📚',
    title: 'Structured Learning',
    description: 'Progressive lessons from basic to advanced, carefully designed for optimal learning.',
  },
  {
    icon: '🎯',
    title: 'Interactive Practice',
    description: 'Engage with interactive exercises and real-time feedback to reinforce your learning.',
  },
  {
    icon: '🏆',
    title: 'Track Progress',
    description: 'Monitor your progress with detailed statistics and achievement systems.',
  },
  {
    icon: '✍️',
    title: 'Writing Practice',
    description: 'Learn proper stroke order and practice writing Japanese characters.',
  },
  {
    icon: '🗣️',
    title: 'Speech Recognition',
    description: 'Practice pronunciation with our advanced speech recognition technology.',
  },
  {
    icon: '🌟',
    title: 'Gamified Experience',
    description: 'Stay motivated with points, streaks, and achievements as you learn.',
  },
];
